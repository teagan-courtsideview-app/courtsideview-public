import type { FanViewMatch } from "../adapters/contracts";

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

export const scoreBugTextColor = (background: string): "#FFFFFF" | "#101827" => {
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

export function ScoreBug({ match }: { match: FanViewMatch }) {
  const teams = [
    { ...match.home, setsWon: match.homeSetsWon },
    { ...match.away, setsWon: match.awaySetsWon },
  ];
  return (
    <section className="score-bug" aria-label="Live match score">
      <div className="score-bug__set">
        <span>SET {match.setNumber}</span>
        <span>BEST OF {match.totalSets}</span>
      </div>
      {teams.map((team) => (
        <div className="score-bug__row" key={team.name}>
          <span
            aria-hidden="true"
            className="score-bug__color"
            style={{ backgroundColor: team.color }}
          />
          <span
            className="score-bug__team"
            style={{
              backgroundColor: team.color,
              color: scoreBugTextColor(team.color),
            }}
          >
            {team.name}
          </span>
          <span
            aria-label={`${team.setsWon} sets won`}
            className="score-bug__sets"
          >
            <small>SETS</small>
            <strong>{team.setsWon}</strong>
          </span>
          <strong className="score-bug__score">{team.score}</strong>
        </div>
      ))}
    </section>
  );
}
