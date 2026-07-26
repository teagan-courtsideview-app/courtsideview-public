import { X } from "@phosphor-icons/react/dist/csr/X";
import { useEffect, useRef, useState } from "react";
import type {
  CommunityAdapter,
  CommunityMessage,
  CommunityRoomSnapshot,
} from "../adapters/contracts";

const EMPTY_ROOM: CommunityRoomSnapshot = {
  connection: "connecting",
  participantCount: 0,
  canWriteText: false,
  messages: [],
};

interface Props {
  adapter: CommunityAdapter;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  shareId: string;
  teamName: string;
}

export function BroadcasterCommunityPanel({
  adapter,
  onOpenChange,
  open,
  shareId,
  teamName,
}: Props) {
  const [room, setRoom] = useState<CommunityRoomSnapshot>(EMPTY_ROOM);
  const [failed, setFailed] = useState(false);
  const feedRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const abortController = new AbortController();
    let unsubscribe = () => {};

    setRoom(EMPTY_ROOM);
    setFailed(false);

    void adapter
      .loadRoom(shareId, abortController.signal)
      .then((snapshot) => {
        if (!abortController.signal.aborted) setRoom(snapshot);
      })
      .catch(() => {
        if (!abortController.signal.aborted) setFailed(true);
      });

    if (adapter.subscribe) {
      unsubscribe = adapter.subscribe(
        shareId,
        setRoom,
        () => setFailed(true),
      );
    }

    return () => {
      abortController.abort();
      unsubscribe();
    };
  }, [adapter, shareId]);

  useEffect(() => {
    if (!open) return;
    const feed = feedRef.current;
    if (feed) feed.scrollTop = feed.scrollHeight;
  }, [open, room.messages.length]);

  return (
    <aside
      aria-hidden={!open}
      aria-label={`${teamName} broadcaster chat`}
      className="community-panel community-panel--broadcaster"
      data-open={open}
      hidden={!open}
      inert={!open}
    >
      <header className="community-header">
        <div className="community-header__copy">
          <div className="community-eyebrow">LIVE COMMUNITY</div>
          <h1 title={`${teamName} Cheering Section`}>
            {teamName} Cheering Section
          </h1>
          <p>
            <span className="presence-dot" aria-hidden="true" />
            {room.participantCount} cheering together
          </p>
        </div>
        <button
          aria-label="Hide Fan chat"
          className="icon-button"
          onClick={() => onOpenChange(false)}
          type="button"
        >
          <X aria-hidden="true" size={22} weight="bold" />
        </button>
      </header>

      <section
        aria-label="Live match chat"
        aria-live="polite"
        className="community-feed"
        ref={feedRef}
        role="log"
      >
        <h2>LIVE MATCH CHAT</h2>

        {failed ? (
          <div className="community-inline-status" role="status">
            <strong>Chat is temporarily unavailable.</strong>
            <span>Your Broadcast is still live.</span>
          </div>
        ) : null}

        {!failed &&
        (room.connection === "connecting" ||
          room.connection === "reconnecting") &&
        room.messages.length === 0 ? (
          <div className="community-inline-status" role="status">
            Connecting to Fan chat…
          </div>
        ) : null}

        {!failed &&
        room.connection !== "connecting" &&
        room.messages.length === 0 ? (
          <div className="community-inline-status">
            Fan messages and cheers will appear here.
          </div>
        ) : null}

        {!failed
          ? room.messages.map((message) => (
              <BroadcasterMessageRow key={message.id} message={message} />
            ))
          : null}
      </section>
    </aside>
  );
}

function BroadcasterMessageRow({ message }: { message: CommunityMessage }) {
  return (
    <article className="community-message" data-own={false}>
      <div
        aria-hidden="true"
        className="community-avatar"
        data-tone={message.avatarTone}
      >
        {message.initials}
      </div>
      <div className="community-message__content">
        <div className="community-message__header">
          <strong>{message.author}</strong>
          <span data-role={message.role}>{message.role}</span>
        </div>
        <p>
          {message.moderated
            ? "Message removed to keep chat safe."
            : message.body}
        </p>
      </div>
    </article>
  );
}
