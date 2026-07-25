import type {
  CheerEmoji,
  CommunityAdapter,
  CommunityMessage,
  CommunityRoomSnapshot,
} from "./contracts";

const initialMessages: CommunityMessage[] = [
  {
    id: "maya",
    author: "Maya’s Mom",
    initials: "MM",
    role: "Family",
    body: "Let’s go 14s Blue! Great energy to start this set 💗",
    avatarTone: "lavender",
    reactions: [
      { emoji: "👏", count: 6 },
      { emoji: "💗", count: 12 },
      { emoji: "🔥", count: 5 },
    ],
  },
  {
    id: "coach-t",
    author: "Coach T",
    initials: "CT",
    role: "Coach",
    body: "Love the communication after that long rally. Keep talking!",
    avatarTone: "blue",
    reactions: [
      { emoji: "👏", count: 4 },
      { emoji: "💗", count: 7 },
      { emoji: "🔥", count: 3 },
    ],
  },
  {
    id: "uncle-jay",
    author: "Uncle Jay",
    initials: "UJ",
    role: "Family",
    body: "Watching from Ohio — that block was huge! 🔥",
    avatarTone: "green",
    reactions: [
      { emoji: "👏", count: 3 },
      { emoji: "💗", count: 6 },
      { emoji: "🔥", count: 9 },
    ],
  },
  {
    id: "liv",
    author: "Liv",
    initials: "L",
    role: "Teammate",
    body: "ACE!! 🏐",
    avatarTone: "gold",
    reactions: [
      { emoji: "👏", count: 10 },
      { emoji: "💗", count: 8 },
      { emoji: "🔥", count: 4 },
    ],
  },
];

export function createFixtureCommunityAdapter(): CommunityAdapter {
  const messages = [...initialMessages];

  return {
    async loadRoom(_shareId, signal): Promise<CommunityRoomSnapshot> {
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");
      return {
        connection: "connected",
        participantCount: 18,
        canWriteText: true,
        messages: [...messages],
      };
    },

    async sendCheer(_shareId: string, _emoji: CheerEmoji) {
      return Promise.resolve();
    },

    async sendMessage(_shareId: string, body: string) {
      const normalized = body.trim().replace(/\s+/g, " ").slice(0, 240);
      if (!normalized) throw new Error("Message is empty.");

      const message: CommunityMessage = {
        id: `fixture-${messages.length + 1}`,
        author: "You",
        initials: "Y",
        role: "Family",
        body: normalized,
        avatarTone: "lavender",
        reactions: [],
        own: true,
      };
      messages.push(message);
      return message;
    },
  };
}

export const fixtureCommunityAdapter = createFixtureCommunityAdapter();
