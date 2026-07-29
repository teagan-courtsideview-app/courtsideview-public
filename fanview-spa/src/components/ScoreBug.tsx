import { Timer } from "@phosphor-icons/react";
import type {
  CompletedSetScore,
  FanViewMatch,
  TeamScore,
} from "../adapters/contracts";

export type ScoreboardLayout = "full-score" | "score-bar" | "minimal";

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

const completedSetsFor = (match: FanViewMatch): CompletedSetScore[] =>
  [...(match.completedSets ?? [])]
    .filter((set) => match.isComplete || set.setNumber < match.setNumber)
    .sort((left, right) => left.setNumber - right.setNumber);

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

function TimeoutStatus({ match }: { match: FanViewMatch }) {
  if (match.timeoutTeamName === undefined) return null;
  return (
    <div className="score-bug__timeout" role="status">
      <Timer
        aria-hidden="true"
        className="score-bug__timeout-icon"
        size={22}
        weight="bold"
      />
      <strong>TIMEOUT — {match.timeoutTeamName || "MATCH PAUSED"}</strong>
    </div>
  );
}

function CompletedSetHistory({
  completedSets,
  homeName,
  awayName,
  mode,
}: {
  completedSets: CompletedSetScore[];
  homeName: string;
  awayName: string;
  mode: "full" | "bar";
}) {
  if (completedSets.length === 0) return null;
  return (
    <div className={`score-bug__history score-bug__history--${mode}`}>
      {completedSets.map((set) => {
        const homeWon = set.homeScore > set.awayScore;
        return (
          <div className="score-bug__history-set" key={set.setNumber}>
            <span className="score-bug__history-label">S{set.setNumber}</span>
            <span
              className={
                homeWon
                  ? "score-bug__history-score is-winner"
                  : "score-bug__history-score"
              }
            >
              {set.homeScore}
              {homeWon ? (
                <i
                  aria-label={`${homeName} won set ${set.setNumber}`}
                  className="score-bug__winner-badge"
                >
                  W
                </i>
              ) : null}
            </span>
            <span aria-hidden="true" className="score-bug__history-dash">
              –
            </span>
            <span
              className={
                homeWon
                  ? "score-bug__history-score"
                  : "score-bug__history-score is-winner"
              }
            >
              {set.awayScore}
              {!homeWon ? (
                <i
                  aria-label={`${awayName} won set ${set.setNumber}`}
                  className="score-bug__winner-badge"
                >
                  W
                </i>
              ) : null}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function SetDots({
  match,
  side,
}: {
  match: FanViewMatch;
  side: LedgerTeam["side"];
}) {
  const wins = side === "home" ? match.homeSetsWon : match.awaySetsWon;
  const needed = Math.ceil(match.totalSets / 2);
  return (
    <span
      aria-label={`${wins} of ${needed} sets won`}
      className="score-bug__set-dots"
    >
      {Array.from({ length: needed }, (_, index) => (
        <i
          className={index < wins ? "is-won" : ""}
          key={`${side}-set-${index + 1}`}
        />
      ))}
    </span>
  );
}

function FullScore({
  completedSets,
  match,
  teams,
}: {
  completedSets: CompletedSetScore[];
  match: FanViewMatch;
  teams: LedgerTeam[];
}) {
  return (
    <>
      <div className="score-bug__full-card">
        {teams.map((team) => (
          <div className="score-bug__full-team" key={team.side}>
            <i
              aria-hidden="true"
              className="score-bug__team-accent"
              style={{ backgroundColor: team.color }}
            />
            <strong title={team.name}>{team.name}</strong>
            <SetDots match={match} side={team.side} />
            <b>{team.score}</b>
          </div>
        ))}
        <div className="score-bug__full-meta">
          <span>SET {match.setNumber}</span>
          <span>
            SETS {match.homeSetsWon}–{match.awaySetsWon}
          </span>
        </div>
        <CompletedSetHistory
          awayName={match.away.name}
          completedSets={completedSets}
          homeName={match.home.name}
          mode="full"
        />
      </div>
      <TimeoutStatus match={match} />
    </>
  );
}

function ScoreBar({
  completedSets,
  match,
}: {
  completedSets: CompletedSetScore[];
  match: FanViewMatch;
}) {
  return (
    <>
      <TimeoutStatus match={match} />
      <div className="score-bug__bar-card">
        <div className="score-bug__bar-team score-bug__bar-team--home">
          <i style={{ backgroundColor: match.home.color }} />
          <span title={match.home.name}>{match.home.name}</span>
          <strong>{match.home.score}</strong>
        </div>
        <div className="score-bug__bar-center">
          <span>SET {match.setNumber}</span>
          <CompletedSetHistory
            awayName={match.away.name}
            completedSets={completedSets}
            homeName={match.home.name}
            mode="bar"
          />
        </div>
        <div className="score-bug__bar-team score-bug__bar-team--away">
          <strong>{match.away.score}</strong>
          <span title={match.away.name}>{match.away.name}</span>
          <i style={{ backgroundColor: match.away.color }} />
        </div>
      </div>
    </>
  );
}

function MinimalScore({ match }: { match: FanViewMatch }) {
  return (
    <div className="score-bug__minimal-card">
      <span>SET {match.setNumber}</span>
      <strong style={{ color: match.home.color }}>{match.home.score}</strong>
      <i aria-hidden="true">–</i>
      <strong style={{ color: match.away.color }}>{match.away.score}</strong>
    </div>
  );
}

export function ScoreBug({
  layout = "full-score",
  match,
}: {
  layout?: ScoreboardLayout;
  match: FanViewMatch;
}) {
  const teams: LedgerTeam[] = [
    { ...match.home, setsWon: match.homeSetsWon, side: "home" },
    { ...match.away, setsWon: match.awaySetsWon, side: "away" },
  ];
  const completedSets = completedSetsFor(match);

  return (
    <section
      className={`score-bug score-bug--${layout}`}
      aria-label={`${match.home.name} ${match.home.score}, ${match.away.name} ${match.away.score}, set ${match.setNumber}`}
    >
      {layout === "minimal" ? (
        <MinimalScore match={match} />
      ) : layout === "score-bar" ? (
        <ScoreBar completedSets={completedSets} match={match} />
      ) : (
        <FullScore completedSets={completedSets} match={match} teams={teams} />
      )}
    </section>
  );
}
