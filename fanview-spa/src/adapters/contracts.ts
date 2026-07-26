export type ConnectionState =
  | "connecting"
  | "connected"
  | "reconnecting"
  | "unavailable"
  | "closed";

export interface TeamScore {
  name: string;
  score: number;
  color: string;
}

export interface FanViewMatch {
  setNumber: number;
  setTarget: number;
  totalSets: number;
  homeSetsWon: number;
  awaySetsWon: number;
  isComplete: boolean;
  isLive: boolean;
  updatedAt: string;
  teamHub?: {
    name: string;
    slug: string;
  };
  home: TeamScore;
  away: TeamScore;
}

export interface FanViewMedia {
  kind: "fixture-poster" | "cloudflare-realtime" | "youtube" | "none";
  posterUrl?: string;
  streamId?: string;
  url?: string;
  rotation?: -90 | 90 | 180;
  alt: string;
}

export interface FanViewActivity {
  id: string;
  message: string;
  team: "home" | "away" | "neutral";
  timestamp?: string;
}

export interface FanViewSnapshot {
  shareId: string;
  match: FanViewMatch;
  media: FanViewMedia;
  viewerCount: number;
  activity: FanViewActivity[];
  latestAction?: string;
  connection: ConnectionState;
  expiresAt?: string;
}

export interface FanViewAdapter {
  loadSnapshot(shareId: string, signal: AbortSignal): Promise<FanViewSnapshot>;
  subscribe?(
    shareId: string,
    onSnapshot: (snapshot: FanViewSnapshot) => void,
    onError: (error: unknown) => void,
  ): () => void;
}

export class FanViewUnavailableError extends Error {
  constructor(message = "This match is not available.") {
    super(message);
    this.name = "FanViewUnavailableError";
  }
}

export type CommunityRole = "Family" | "Coach" | "Teammate" | "Fan";
export type CheerEmoji = "👏" | "💗" | "🔥" | "🙌" | "🏐" | "💪";

export interface CommunityReaction {
  emoji: CheerEmoji;
  count: number;
}

export interface CommunityMessage {
  id: string;
  author: string;
  initials: string;
  role: CommunityRole;
  body: string;
  avatarTone: "lavender" | "blue" | "green" | "gold";
  reactions: CommunityReaction[];
  moderated?: boolean;
  own?: boolean;
}

export interface CommunityRoomSnapshot {
  connection: ConnectionState;
  participantCount: number;
  canWriteText: boolean;
  messages: CommunityMessage[];
}

export interface CommunityAdapter {
  loadRoom(shareId: string, signal: AbortSignal): Promise<CommunityRoomSnapshot>;
  subscribe?(
    shareId: string,
    onSnapshot: (snapshot: CommunityRoomSnapshot) => void,
    onError: (error: unknown) => void,
  ): () => void;
  sendCheer(shareId: string, emoji: CheerEmoji): Promise<void>;
  sendMessage(shareId: string, body: string): Promise<CommunityMessage>;
}
