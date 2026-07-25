import {
  Heart,
  PaperPlaneTilt,
  X,
} from "@phosphor-icons/react";
import {
  type FormEvent,
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  CheerEmoji,
  CommunityAdapter,
  CommunityMessage,
  CommunityRoomSnapshot,
} from "../adapters/contracts";

const QUICK_CHEERS: CheerEmoji[] = ["👏", "💗", "🔥", "🙌", "🏐", "💪"];
const EMPTY_ROOM: CommunityRoomSnapshot = {
  connection: "connecting",
  participantCount: 0,
  canWriteText: false,
  messages: [],
};

interface Props {
  adapter: CommunityAdapter;
  matchComplete: boolean;
  shareId: string;
  teamName: string;
}

export function CommunityPanel({
  adapter,
  matchComplete,
  shareId,
  teamName,
}: Props) {
  const [open, setOpen] = useState(true);
  const [room, setRoom] = useState<CommunityRoomSnapshot>(EMPTY_ROOM);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [failed, setFailed] = useState(false);
  const [sending, setSending] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const sheetStartY = useRef<number | null>(null);

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
    if (open) {
      panelRef.current?.focus({ preventScroll: true });
    } else {
      launcherRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  function closeCommunity() {
    setOpen(false);
    setStatus("");
  }

  function onDialogKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeCommunity();
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        "button:not([disabled]), input:not([disabled])",
      ),
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function onHandlePointerDown(event: PointerEvent<HTMLDivElement>) {
    sheetStartY.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onHandlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = sheetStartY.current;
    sheetStartY.current = null;
    if (start !== null && event.clientY - start > 64) closeCommunity();
  }

  async function sendCheer(emoji: CheerEmoji) {
    if (failed || matchComplete) return;
    try {
      await adapter.sendCheer(shareId, emoji);
      setStatus(`${emoji} sent to everyone cheering`);
    } catch {
      setStatus("That cheer did not send. The live match is unaffected.");
    }
  }

  async function submitMessage(event: FormEvent) {
    event.preventDefault();
    const body = message.trim().replace(/\s+/g, " ").slice(0, 240);
    if (!body || failed || matchComplete || !room.canWriteText || sending) return;

    setSending(true);
    try {
      const sent = await adapter.sendMessage(shareId, body);
      setRoom((current) => ({
        ...current,
        messages: [...current.messages, sent],
      }));
      setMessage("");
      setStatus("Cheer sent.");
    } catch {
      setStatus("Your message did not send. The live match is unaffected.");
    } finally {
      setSending(false);
    }
  }

  const readOnly =
    failed || matchComplete || !room.canWriteText || room.connection === "closed";

  return (
    <>
      {!open ? (
        <button
          aria-expanded="false"
          className="community-launcher"
          onClick={() => setOpen(true)}
          ref={launcherRef}
          type="button"
        >
          <Heart aria-hidden="true" size={20} weight="fill" />
          Cheer together
          <span>{room.participantCount}</span>
        </button>
      ) : null}

      <button
        aria-label="Close Cheering Section"
        className="community-scrim"
        data-open={open}
        onClick={closeCommunity}
        tabIndex={open ? 0 : -1}
        type="button"
      />

      <aside
        aria-label={`${teamName} Cheering Section`}
        aria-modal="true"
        className="community-panel"
        data-open={open}
        onKeyDown={onDialogKeyDown}
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        <div
          aria-label="Drag down to close Cheering Section"
          className="community-handle"
          onPointerDown={onHandlePointerDown}
          onPointerUp={onHandlePointerUp}
          role="button"
          tabIndex={-1}
        />

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
            aria-label="Close Cheering Section"
            className="icon-button"
            onClick={closeCommunity}
            type="button"
          >
            <X aria-hidden="true" size={22} weight="bold" />
          </button>
        </header>

        <div className="safety-notice">
          <Heart aria-hidden="true" size={23} weight="regular" />
          <span>Cheer kindly. No player criticism or personal information.</span>
        </div>

        <section
          aria-label="Live match chat"
          aria-live="polite"
          className="community-feed"
          role="log"
        >
          <h2>LIVE MATCH CHAT</h2>

          {room.connection === "connecting" && !failed ? (
            <div aria-label="Loading community" className="message-skeletons">
              <span />
              <span />
              <span />
            </div>
          ) : null}

          {failed ? (
            <div className="community-inline-status" role="status">
              <strong>Cheering is temporarily unavailable.</strong>
              <span>Video and live scoring will continue normally.</span>
            </div>
          ) : null}

          {!failed && room.connection === "reconnecting" ? (
            <div className="community-inline-status" role="status">
              Reconnecting the Cheering Section…
            </div>
          ) : null}

          {!failed && room.messages.length === 0 && room.connection !== "connecting" ? (
            <div className="community-inline-status">
              Be the first to send a positive cheer for the team.
            </div>
          ) : null}

          {!failed
            ? room.messages.map((item) => (
                <CommunityMessageRow key={item.id} message={item} />
              ))
            : null}
        </section>

        <form className="community-composer" onSubmit={submitMessage}>
          <div aria-label="Quick cheers" className="quick-cheers">
            {QUICK_CHEERS.map((emoji) => (
              <button
                aria-label={`Send ${emoji} cheer`}
                disabled={failed || matchComplete}
                key={emoji}
                onClick={() => void sendCheer(emoji)}
                type="button"
              >
                <span aria-hidden="true">{emoji}</span>
              </button>
            ))}
          </div>
          <div className="composer-row">
            <input
              aria-label="Add a positive cheer"
              disabled={readOnly}
              maxLength={240}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={
                matchComplete ? "Chat closed after the match" : "Add a positive cheer…"
              }
              value={message}
            />
            <button
              aria-label="Send cheer"
              className="send-button"
              disabled={readOnly || sending || message.trim().length === 0}
              type="submit"
            >
              <PaperPlaneTilt aria-hidden="true" size={21} weight="fill" />
            </button>
          </div>
          <div className="composer-meta">
            <span className="sr-only" aria-live="polite">
              {status}
            </span>
            <span aria-hidden="true">{message.length} / 240</span>
          </div>
        </form>
      </aside>
    </>
  );
}

function CommunityMessageRow({ message }: { message: CommunityMessage }) {
  return (
    <article className="community-message" data-own={message.own ?? false}>
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
        <div className="reaction-row">
          {message.reactions.map((reaction) => (
            <button
              aria-label={`${reaction.count} ${reaction.emoji} reactions`}
              key={reaction.emoji}
              type="button"
            >
              <span aria-hidden="true">{reaction.emoji}</span>
              {reaction.count}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
