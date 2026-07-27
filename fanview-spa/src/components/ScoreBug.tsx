import { Timer } from "@phosphor-icons/react";
import type { CSSProperties } from "react";
import type {
  CompletedSetScore,
  FanViewMatch,
  TeamScore,
} from "../adapters/contracts";

const channel = (value: string): number => {
  const normalized = value.length === 1 ? `${value}${value}` : value;
  return Number.parseInt(normalized, 16);
};

const relativeChannel = (value: number): number => {
  const normalized = value / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
};

export const scoreBugTextColor = (
  background: string,
): "#FFFFFF" | "#101827" => {
  const match = background.trim().match(/^#([\da-f]{3}|[\da-f]{6})$/i);
  if (!match) return "#FFFFFF";
  const hex = match[1];
  const width = hex.length === 3 ? 1 : 2;
  const red = relativeChannel(channel(hex.slice(0, width)));
  const green = relativeChannel(channel(hex.slice(width, width * 2)));
  const blue = relativeChannel(channel(hex.slice(width * 2, width * 3)));
  const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  const whiteContrast = 1.05 / (luminance + 0.05);
  const darkContrast = (luminance + 0.05) / 0.056;
  return darkContrast > whiteContrast ? "#101827" : "#FFFFFF";
};

type LedgerTeam = TeamScore & {
  side: "home" | "away";
  setsWon: number;
};

const initials = (name: string): string => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "CV";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] ?? ""}${words.at(-1)?.[0] ?? ""}`.toUpperCase();
};

const scoreForTeam = (
  set: CompletedSetScore,
  side: LedgerTeam["side"],
): number => (side === "home" ? set.homeScore : set.awayScore);

const teamWonSet = (
  set: CompletedSetScore,
  side: LedgerTeam["side"],
): boolean =>
  side === "home"
    ? set.homeScore > set.awayScore
    : set.awayScore > set.homeScore;

export function ScoreBug({ match }: { match: FanViewMatch }) {
  const teams: LedgerTeam[] = [
    { ...match.home, setsWon: match.homeSetsWon, side: "home" },
    { ...match.away, setsWon: match.awaySetsWon, side: "away" },
  ];
  const completedSets = [...(match.completedSets ?? [])]
    .filter((set) => match.isComplete || set.setNumber < match.setNumber)
    .sort((left, right) => left.setNumber - right.setNumber);
  const visibleSets: Array<
    | { kind: "complete"; set: CompletedSetScore }
    | { kind: "live"; setNumber: number }
  > = [
    ...completedSets.map((set) => ({ kind: "complete" as const, set })),
    ...(!match.isComplete
      ? [{ kind: "live" as const, setNumber: match.setNumber }]
      : []),
  ];
  const gridStyle = {
    gridTemplateColumns: `minmax(0, 1.65fr) repeat(${Math.max(
      visibleSets.length,
      1,
    )}, minmax(0, 0.56fr))`,
  } satisfies CSSProperties;

  return (
    <section className="score-bug" aria-label="Live match score">
      {match.timeoutTeamName !== undefined ? (
        <div className="score-bug__timeout" role="status">
          <Timer
            aria-hidden="true"
            className="score-bug__timeout-icon"
            size={22}
            weight="bold"
          />
          <strong>TIMEOUT — {match.timeoutTeamName || "MATCH PAUSED"}</strong>
        </div>
      ) : null}

      <div className="score-bug__ledger">
        <div className="score-bug__header" style={gridStyle}>
          <div className="score-bug__format">BEST OF {match.totalSets}</div>
          {visibleSets.map((entry) => {
            const setNumber =
              entry.kind === "complete" ? entry.set.setNumber : entry.setNumber;
            return (
              <div
                className={
                  entry.kind === "live"
                    ? "score-bug__set-heading is-live"
                    : "score-bug__set-heading"
                }
                key={`${entry.kind}-${setNumber}`}
              >
                <span>S{setNumber}</span>
                {entry.kind === "live" ? (
                  <small>
                    <i aria-hidden="true" />
                    LIVE
                  </small>
                ) : null}
              </div>
            );
          })}
        </div>

        {teams.map((team) => (
          <div className="score-bug__row" key={team.side} style={gridStyle}>
            <div className="score-bug__team">
              <span
                aria-hidden="true"
                className="score-bug__team-mark"
                style={{
                  backgroundColor: team.color,
                  color: scoreBugTextColor(team.color),
                }}
              >
                {initials(team.name)}
              </span>
              <span className="score-bug__team-copy">
                <strong title={team.name}>{team.name}</strong>
                <small aria-label={`${team.setsWon} sets won`}>
                  SETS <b>{team.setsWon}</b>
                </small>
              </span>
            </div>
            {visibleSets.map((entry) => {
              const setNumber =
                entry.kind === "complete" ? entry.set.setNumber : entry.setNumber;
              const won =
                entry.kind === "complete" &&
                teamWonSet(entry.set, team.side);
              const score =
                entry.kind === "complete"
                  ? scoreForTeam(entry.set, team.side)
                  : team.score;
              return (
                <div
                  className={[
                    "score-bug__set-cell",
                    won ? "is-winner" : "",
                    entry.kind === "live" ? "is-live" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={`${team.side}-${setNumber}`}
                >
                  {won ? (
                    <span
                      aria-label={`${team.name} won set ${setNumber}`}
                      className="score-bug__winner-badge"
                    >
                      W
                    </span>
                  ) : null}
                  <strong className="score-bug__cell-score">{score}</strong>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
