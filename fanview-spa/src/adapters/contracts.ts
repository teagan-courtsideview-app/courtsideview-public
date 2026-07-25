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
  isComplete: boolean;
  isLive: boolean;
  home: TeamScore;
  away: TeamScore;
}

export interface FanViewMedia {
  kind: "fixture-poster" | "none";
  posterUrl?: string;
  alt: string;
}

export interface FanViewSnapshot {
  match: FanViewMatch;
  media: FanViewMedia;
  viewerCount: number;
}

export interface FanViewAdapter {
  loadSnapshot(shareId: string, signal: AbortSignal): Promise<FanViewSnapshot>;
  subscribe?(
    shareId: string,
    onSnapshot: (snapshot: FanViewSnapshot) => void,
    onError: (error: unknown) => void,
  ): () => void;
}

export type CommunityRole = "Family" | "Coach" | "Teammate";
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
