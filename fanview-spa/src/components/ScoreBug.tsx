import type { FanViewMatch } from "../adapters/contracts";

export function ScoreBug({ match }: { match: FanViewMatch }) {
  return (
    <section className="score-bug" aria-label="Live match score">
      <div className="score-bug__set">SET {match.setNumber}</div>
      {[match.home, match.away].map((team) => (
        <div className="score-bug__row" key={team.name}>
          <span
            aria-hidden="true"
            className="score-bug__color"
            style={{ backgroundColor: team.color }}
          />
          <span className="score-bug__team" style={{ backgroundColor: team.color }}>
            {team.name}
          </span>
          <strong className="score-bug__score">{team.score}</strong>
        </div>
      ))}
    </section>
  );
}
