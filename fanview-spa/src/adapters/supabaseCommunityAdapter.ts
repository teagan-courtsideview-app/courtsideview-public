import type {
  CheerEmoji,
  CommunityAdapter,
  CommunityMessage,
  CommunityRole,
  CommunityRoomSnapshot,
  ConnectionState,
} from "./contracts";

type JsonRecord = Record<string, unknown>;

type AuthSession = {
  access_token: string;
  user: { id: string };
};

type RealtimeStatus =
  | "SUBSCRIBED"
  | "TIMED_OUT"
  | "CLOSED"
  | "CHANNEL_ERROR"
  | string;

interface RealtimeChannelLike {
  on(
    type: "broadcast" | "presence",
    filter: Record<string, string>,
    callback: () => void,
  ): RealtimeChannelLike;
  presenceState(): Record<string, unknown[]>;
  subscribe(callback: (status: RealtimeStatus) => void): RealtimeChannelLike;
  track(payload: Record<string, unknown>): Promise<unknown>;
}

export interface CommunitySupabaseClient {
  auth: {
    getSession(): Promise<{
      data: { session: AuthSession | null };
      error: { message: string } | null;
    }>;
    signInAnonymously(): Promise<{
      data: { session: AuthSession | null; user: { id: string } | null };
      error: { message: string } | null;
    }>;
  };
  channel(
    topic: string,
    options: {
      config: {
        private: true;
        presence: { key: string };
      };
    },
  ): RealtimeChannelLike;
  realtime: {
    setAuth(token: string): Promise<void> | void;
  };
  removeChannel(channel: RealtimeChannelLike): Promise<unknown>;
}

export interface SupabaseCommunityAdapterOptions {
  client: CommunitySupabaseClient;
  displayName?: string;
  fetch?: typeof globalThis.fetch;
  gatewayUrl: string;
  publishableKey: string;
}

interface GatewayErrorBody {
  error?: {
    code?: string;
    message?: string;
    retryable?: boolean;
  };
}

interface RoomContext {
  shareId: string;
  roomId: string;
  userId: string;
  mode: string;
  status: string;
  inaccessibleAt: string | null;
  participantCount: number;
  messages: CommunityMessage[];
  channel: RealtimeChannelLike | null;
  connection: ConnectionState;
}

const CHEER_KEYS: Record<CheerEmoji, string> = {
  "👏": "clap",
  "💗": "heart",
  "🔥": "fire",
  "🙌": "celebrate",
  "🏐": "volleyball",
  "💪": "strong",
};

const AVATAR_TONES = ["lavender", "blue", "green", "gold"] as const;

const asRecord = (value: unknown): JsonRecord =>
  value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};

const asString = (value: unknown): string =>
  typeof value === "string" ? value : "";

const gatewayData = (value: unknown): JsonRecord => {
  const body = asRecord(value);
  return asRecord(body.data);
};

const roleFromValue = (value: unknown): CommunityRole => {
  const role = asString(value);
  if (role === "host" || role === "moderator") return "Coach";
  if (role === "teammate") return "Teammate";
  return "Fan";
};

const avatarToneFor = (
  value: string,
): (typeof AVATAR_TONES)[number] => {
  const index = Array.from(value).reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  ) % AVATAR_TONES.length;
  return AVATAR_TONES[index] ?? "lavender";
};

const initialsFor = (value: string): string =>
  value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "FV";

const messageFromGateway = (value: unknown): CommunityMessage | null => {
  const row = asRecord(value);
  if (asString(row.type) !== "text") return null;
  const id = asString(row.id);
  const author = asString(row.display_name) || "Fan";
  const body = asString(row.body);
  if (!id || !body) return null;
  return {
    id,
    author,
    initials: initialsFor(author),
    role: roleFromValue(row.role),
    body,
    avatarTone: avatarToneFor(author),
    reactions: [],
    moderated: asString(row.moderation_status) !== "visible",
    own: row.is_own === true,
  };
};

const messagesFromGateway = (value: unknown): CommunityMessage[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map(messageFromGateway)
    .filter((message): message is CommunityMessage => message !== null);
};

const snapshotFromContext = (
  context: RoomContext,
): CommunityRoomSnapshot => ({
  connection: context.connection,
  participantCount: context.participantCount,
  // The first production rollout is deliberately curated-cheers only.
  // Verified free text remains unavailable until its separate admission and
  // moderation UI is explicitly released.
  canWriteText: false,
  messages: context.messages,
});

export class FanViewCommunityGatewayError extends Error {
  readonly code: string;
  readonly retryable: boolean;
  readonly status: number;

  constructor(
    message: string,
    options: { code?: string; retryable?: boolean; status: number },
  ) {
    super(message);
    this.name = "FanViewCommunityGatewayError";
    this.code = options.code ?? "community_unavailable";
    this.retryable = options.retryable ?? false;
    this.status = options.status;
  }
}

export function createSupabaseCommunityAdapter(
  options: SupabaseCommunityAdapterOptions,
): CommunityAdapter {
  const fetcher = options.fetch ?? globalThis.fetch.bind(globalThis);
  const displayName =
    options.displayName?.trim().replace(/\s+/g, " ").slice(0, 24) || "Fan";
  const contexts = new Map<string, Promise<RoomContext>>();
  const listeners = new Map<
    string,
    Set<(snapshot: CommunityRoomSnapshot) => void>
  >();

  const emit = (context: RoomContext): void => {
    for (const listener of listeners.get(context.shareId) ?? []) {
      listener(snapshotFromContext(context));
    }
  };

  const authenticatedSession = async (): Promise<AuthSession> => {
    const current = await options.client.auth.getSession();
    if (current.error) throw new Error(current.error.message);
    if (current.data.session) return current.data.session;

    const anonymous = await options.client.auth.signInAnonymously();
    if (anonymous.error) throw new Error(anonymous.error.message);
    if (!anonymous.data.session) {
      throw new Error("FanView Community could not establish a session.");
    }
    return anonymous.data.session;
  };

  const invoke = async (
    session: AuthSession,
    operation: string,
    input: JsonRecord,
    idempotencyKey?: string,
  ): Promise<JsonRecord> => {
    const headers: Record<string, string> = {
      apikey: options.publishableKey,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    };
    if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;

    const response = await fetcher(options.gatewayUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ operation, input }),
    });
    const body = (await response.json().catch(() => ({}))) as GatewayErrorBody;
    if (!response.ok) {
      throw new FanViewCommunityGatewayError(
        body.error?.message || "FanView Community is unavailable.",
        {
          code: body.error?.code,
          retryable: body.error?.retryable,
          status: response.status,
        },
      );
    }
    return gatewayData(body);
  };

  const loadMessages = async (
    session: AuthSession,
    context: RoomContext,
  ): Promise<void> => {
    const result = await invoke(session, "list_messages", {
      roomId: context.roomId,
    });
    context.mode = asString(result.mode) || context.mode;
    context.status = asString(result.status) || context.status;
    context.inaccessibleAt = asString(result.inaccessible_at) || null;
    context.messages = messagesFromGateway(result.messages);
    context.connection =
      context.status === "closed" ? "closed" : "connected";
  };

  const createContext = async (shareId: string): Promise<RoomContext> => {
    const session = await authenticatedSession();
    const joined = await invoke(session, "join_room", {
      shareId,
      displayName,
      adultAttested: false,
    });
    const roomId = asString(joined.room_id);
    if (!roomId) throw new Error("FanView Community returned no room.");

    const context: RoomContext = {
      shareId,
      roomId,
      userId: session.user.id,
      mode: asString(joined.mode),
      status: asString(joined.status),
      inaccessibleAt: null,
      participantCount: 0,
      messages: [],
      channel: null,
      connection: "connecting",
    };
    return context;
  };

  const contextFor = (shareId: string): Promise<RoomContext> => {
    const existing = contexts.get(shareId);
    if (existing) return existing;
    const creating = createContext(shareId).catch((error) => {
      contexts.delete(shareId);
      throw error;
    });
    contexts.set(shareId, creating);
    return creating;
  };

  const refreshContext = async (context: RoomContext): Promise<void> => {
    const session = await authenticatedSession();
    await loadMessages(session, context);
    emit(context);
  };

  return {
    async loadRoom(shareId, signal) {
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");
      const context = await contextFor(shareId);
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");
      return snapshotFromContext(context);
    },

    subscribe(shareId, onSnapshot, onError) {
      const shareListeners = listeners.get(shareId) ?? new Set();
      shareListeners.add(onSnapshot);
      listeners.set(shareId, shareListeners);
      let active = true;
      let subscribedChannel: RealtimeChannelLike | null = null;

      void contextFor(shareId)
        .then(async (context) => {
          if (!active) return;
          onSnapshot(snapshotFromContext(context));
          if (context.channel) return;

          const session = await authenticatedSession();
          await options.client.realtime.setAuth(session.access_token);
          const channel = options.client.channel(
            `fanview-community:${context.roomId}`,
            {
              config: {
                private: true,
                presence: { key: context.userId },
              },
            },
          );
          context.channel = channel;
          subscribedChannel = channel;

          const reload = () => {
            if (!active) return;
            void refreshContext(context).catch(onError);
          };
          const syncPresence = () => {
            const presence = channel.presenceState();
            context.participantCount = Math.max(
              1,
              Object.values(presence).reduce(
                (total, entries) => total + entries.length,
                0,
              ),
            );
            emit(context);
          };

          channel
            .on("broadcast", { event: "message.created" }, reload)
            .on("broadcast", { event: "message.updated" }, reload)
            .on("broadcast", { event: "room.updated" }, reload)
            .on("presence", { event: "sync" }, syncPresence)
            .subscribe((status) => {
              if (!active) return;
              if (status === "SUBSCRIBED") {
                context.connection = "connected";
                context.participantCount = Math.max(
                  1,
                  context.participantCount,
                );
                emit(context);
                void channel.track({
                  online_at: new Date().toISOString(),
                });
                // Subscribe first, then hydrate history so a message cannot
                // land in the gap between the initial list and Realtime.
                void refreshContext(context).catch(onError);
                return;
              }
              if (status === "CLOSED") {
                context.connection = "closed";
              } else if (
                status === "CHANNEL_ERROR" ||
                status === "TIMED_OUT"
              ) {
                context.connection = "reconnecting";
              }
              emit(context);
            });
        })
        .catch((error) => {
          if (active) onError(error);
        });

      return () => {
        active = false;
        shareListeners.delete(onSnapshot);
        if (shareListeners.size === 0) listeners.delete(shareId);
        if (subscribedChannel) {
          void options.client.removeChannel(subscribedChannel);
          void contextFor(shareId).then((context) => {
            if (context.channel === subscribedChannel) context.channel = null;
          });
        }
      };
    },

    async sendCheer(shareId, emoji) {
      const context = await contextFor(shareId);
      const session = await authenticatedSession();
      await invoke(
        session,
        "send_message",
        {
          roomId: context.roomId,
          messageType: "cheer",
          body: CHEER_KEYS[emoji],
        },
        crypto.randomUUID(),
      );
    },

    async sendMessage(shareId, body) {
      const context = await contextFor(shareId);
      const session = await authenticatedSession();
      const created = await invoke(
        session,
        "send_message",
        {
          roomId: context.roomId,
          messageType: "text",
          body,
        },
        crypto.randomUUID(),
      );
      const message = messageFromGateway({
        ...created,
        type: "text",
        display_name: asString(created.display_name) || displayName,
        role: "participant",
        moderation_status: "visible",
        is_own: true,
      });
      if (!message) throw new Error("FanView Community returned no message.");
      return message;
    },
  };
}
