import type { FanViewMatch, FanViewMedia } from "../../fanview-spa/src/adapters/contracts";
import { scoreBugTextColor, scoreBugReadableTeamColor, type ScoreboardLayout } from "../../fanview-spa/src/components/ScoreBug";
import type { ScoreboardPosition, ScoreboardSize } from "./ProductionApp";

const roundedRect = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.arcTo(x + width, y, x + width, y + height, safeRadius);
  context.arcTo(
    x + width,
    y + height,
    x,
    y + height,
    safeRadius,
  );
  context.arcTo(x, y + height, x, y, safeRadius);
  context.arcTo(x, y, x + width, y, safeRadius);
  context.closePath();
};

const fitCanvasText = (
  context: CanvasRenderingContext2D,
  value: string,
  maxWidth: number,
): string => {
  if (context.measureText(value).width <= maxWidth) return value;
  let fitted = value;
  while (
    fitted.length > 1 &&
    context.measureText(`${fitted}…`).width > maxWidth
  ) {
    fitted = fitted.slice(0, -1);
  }
  return `${fitted}…`;
};

export const drawPresentationFrame = (
  canvas: HTMLCanvasElement,
  source: HTMLVideoElement,
  rotation: FanViewMedia["rotation"],
  match: FanViewMatch,
  viewerCount: number,
  scoreboardLayout: ScoreboardLayout,
  scoreboardPosition: ScoreboardPosition,
  scoreboardSize: ScoreboardSize,
) => {
  const context = canvas.getContext("2d", { alpha: false });
  if (!context || source.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
    return;
  }
  const width = canvas.width;
  const height = canvas.height;
  const rawWidth = source.videoWidth || 1280;
  const rawHeight = source.videoHeight || 720;
  const quarterTurn = rotation === -90 || rotation === 90;
  const visibleWidth = quarterTurn ? rawHeight : rawWidth;
  const visibleHeight = quarterTurn ? rawWidth : rawHeight;
  const scale = Math.max(width / visibleWidth, height / visibleHeight);

  context.save();
  context.fillStyle = "#000000";
  context.fillRect(0, 0, width, height);
  context.translate(width / 2, height / 2);
  context.rotate(((rotation ?? 0) * Math.PI) / 180);
  context.drawImage(
    source,
    (-rawWidth * scale) / 2,
    (-rawHeight * scale) / 2,
    rawWidth * scale,
    rawHeight * scale,
  );
  context.restore();

  const portrait = height > width;
  const uiScale = Math.max(
    0.82,
    Math.min(1.08, Math.min(width, height) / 720),
  );
  const edge = Math.max(14, Math.round(18 * uiScale));
  const pillHeight = Math.round(36 * uiScale);

  context.save();
  context.textBaseline = "middle";
  context.font = `600 ${Math.round(14 * uiScale)}px "CV Plus Jakarta Sans", system-ui, sans-serif`;
  roundedRect(context, edge, edge, 72 * uiScale, pillHeight, 8 * uiScale);
  context.fillStyle = "#d32f2f";
  context.fill();
  context.fillStyle = "#ffffff";
  context.beginPath();
  context.arc(
    edge + 14 * uiScale,
    edge + pillHeight / 2,
    4 * uiScale,
    0,
    Math.PI * 2,
  );
  context.fill();
  context.fillText("LIVE", edge + 25 * uiScale, edge + pillHeight / 2);

  const viewerWidth = 62 * uiScale;
  roundedRect(
    context,
    width - edge - viewerWidth,
    edge,
    viewerWidth,
    pillHeight,
    8 * uiScale,
  );
  context.fillStyle = "rgba(3, 8, 15, 0.78)";
  context.fill();
  context.strokeStyle = "rgba(255, 255, 255, 0.65)";
  context.lineWidth = Math.max(1, uiScale);
  context.stroke();
  context.fillStyle = "#ffffff";
  context.textAlign = "center";
  context.fillText(
    `◉ ${Math.max(0, viewerCount)}`,
    width - edge - viewerWidth / 2,
    edge + pillHeight / 2,
  );

  const sizeScale =
    scoreboardSize === "small" ? 0.82 : scoreboardSize === "large" ? 1.18 : 1;
  const layoutWidth =
    scoreboardLayout === "minimal"
      ? 226
      : scoreboardLayout === "score-bar"
        ? portrait
          ? 326
          : 620
        : portrait
          ? 314
          : 390;
  const completedSets = [...(match.completedSets ?? [])]
    .filter((set) => match.isComplete || set.setNumber < match.setNumber)
    .sort((left, right) => left.setNumber - right.setNumber);
  const historyRows = Math.ceil(completedSets.length / 3);
  const historyExtra = scoreboardLayout === "score-bar"
    ? historyRows * 22
    : scoreboardLayout === "full-score" ? Math.max(0, historyRows - 1) * 22 : 0;
  const layoutHeight =
    scoreboardLayout === "minimal"
      ? 54
      : scoreboardLayout === "score-bar"
        ? match.timeoutTeamName !== undefined
          ? 106
          : 70
        : match.timeoutTeamName !== undefined
          ? 216
          : 180;
  const cardWidth = Math.min(
    width - edge * 2,
    layoutWidth * uiScale * sizeScale,
  );
  const cardHeight = (layoutHeight + historyExtra) * uiScale * sizeScale;
  const anchorX =
    scoreboardPosition.endsWith("right")
      ? width - edge - cardWidth
      : scoreboardPosition === "bottom-center"
        ? (width - cardWidth) / 2
        : edge;
  const anchorY = scoreboardPosition.startsWith("top")
    ? edge + pillHeight + 16 * uiScale
    : height - edge - cardHeight;
  const cardX = anchorX;
  const cardY = anchorY;
  const cardPadding = 10 * uiScale * sizeScale;


  if (scoreboardLayout === "minimal") {
    roundedRect(context, cardX, cardY, cardWidth, cardHeight, cardHeight / 2);
    context.fillStyle = "rgba(3, 8, 15, 0.92)";
    context.fill();
    context.strokeStyle = "rgba(255, 255, 255, 0.34)";
    context.lineWidth = Math.max(1, uiScale);
    context.stroke();
    const setWidth = cardWidth * 0.38;
    roundedRect(
      context,
      cardX + 7 * uiScale,
      cardY + 7 * uiScale,
      setWidth,
      cardHeight - 14 * uiScale,
      (cardHeight - 14 * uiScale) / 2,
    );
    context.fillStyle = match.away.color || "#ff5f2d";
    context.fill();
    context.textAlign = "center";
    context.fillStyle = scoreBugTextColor(match.away.color || "#ff5f2d");
    context.font = `600 ${Math.round(14 * uiScale * sizeScale)}px "CV Plus Jakarta Sans", system-ui, sans-serif`;
    context.fillText(
      `SET ${match.setNumber}`,
      cardX + 7 * uiScale + setWidth / 2,
      cardY + cardHeight / 2,
    );
    context.fillStyle = scoreBugReadableTeamColor(match.home.color || "#20cdb4");
    context.fillText(
      String(match.home.score),
      cardX + cardWidth * 0.59,
      cardY + cardHeight / 2,
    );
    context.fillStyle = "#9aa3ae";
    context.fillText("–", cardX + cardWidth * 0.72, cardY + cardHeight / 2);
    context.fillStyle = scoreBugReadableTeamColor(match.away.color || "#ff5f2d");
    context.fillText(
      String(match.away.score),
      cardX + cardWidth * 0.84,
      cardY + cardHeight / 2,
    );
    context.restore();
    return;
  }

  const timeoutHeight =
    match.timeoutTeamName !== undefined ? 34 * uiScale * sizeScale : 0;
  const panelY = cardY + timeoutHeight;
  const totalPanelHeight = cardHeight - timeoutHeight;
  const panelHeight = totalPanelHeight - historyExtra * uiScale * sizeScale;
  roundedRect(
    context,
    cardX,
    panelY,
    cardWidth,
    totalPanelHeight,
    10 * uiScale,
  );
  context.fillStyle = "rgba(3, 8, 15, 0.94)";
  context.fill();
  context.strokeStyle = "rgba(255, 255, 255, 0.36)";
  context.lineWidth = Math.max(1, uiScale);
  context.stroke();

  context.textBaseline = "middle";
  if (scoreboardLayout === "score-bar") {
    const sideWidth = cardWidth * 0.39;
    const centerWidth = cardWidth - sideWidth * 2;
    const accentWidth = 7 * uiScale * sizeScale;
    const drawBarTeam = (
      x: number,
      team: FanViewMatch["home"],
      score: number,
      reversed: boolean,
    ) => {
      context.fillStyle = team.color;
      context.fillRect(
        reversed ? x + sideWidth - accentWidth : x,
        panelY + 10 * uiScale,
        accentWidth,
        panelHeight - 20 * uiScale,
      );
      context.fillStyle = "#ffffff";
      context.font = `600 ${Math.round(15 * uiScale * sizeScale)}px "CV Plus Jakarta Sans", system-ui, sans-serif`;
      context.textAlign = reversed ? "right" : "left";
      context.fillText(
        fitCanvasText(context, team.name.toUpperCase(), sideWidth * 0.58),
        reversed ? x + sideWidth - 24 * uiScale : x + 22 * uiScale,
        panelY + panelHeight / 2,
      );
      context.font = `600 ${Math.round(25 * uiScale * sizeScale)}px "CV Plus Jakarta Sans", system-ui, sans-serif`;
      context.textAlign = reversed ? "left" : "right";
      context.fillText(
        String(score),
        reversed ? x + 12 * uiScale : x + sideWidth - 12 * uiScale,
        panelY + panelHeight / 2,
      );
    };
    drawBarTeam(cardX, match.home, match.home.score, false);
    drawBarTeam(
      cardX + sideWidth + centerWidth,
      match.away,
      match.away.score,
      true,
    );
    context.strokeStyle = "rgba(255,255,255,0.22)";
    context.beginPath();
    context.moveTo(cardX + sideWidth, panelY);
    context.lineTo(cardX + sideWidth, panelY + panelHeight);
    context.moveTo(cardX + sideWidth + centerWidth, panelY);
    context.lineTo(cardX + sideWidth + centerWidth, panelY + panelHeight);
    context.stroke();
    context.textAlign = "center";
    context.fillStyle = "#d6dbe2";
    context.font = `600 ${Math.round(11 * uiScale * sizeScale)}px "CV Plus Jakarta Sans", system-ui, sans-serif`;
    context.fillText(
      `SET ${match.setNumber}`,
      cardX + sideWidth + centerWidth / 2,
      panelY + panelHeight * 0.31,
    );
    context.font = `600 ${Math.round(9 * uiScale * sizeScale)}px "CV Plus Jakarta Sans", system-ui, sans-serif`;
    context.fillText(
      `SETS ${match.homeSetsWon}–${match.awaySetsWon}`,
      cardX + sideWidth + centerWidth / 2,
      panelY + panelHeight * 0.69,
    );
  } else {
    const rowHeight = panelHeight * 0.31;
    const teams = [
      { ...match.home, setsWon: match.homeSetsWon },
      { ...match.away, setsWon: match.awaySetsWon },
    ];
    teams.forEach((team, index) => {
      const rowY = panelY + index * rowHeight;
      context.fillStyle = team.color;
      roundedRect(
        context,
        cardX + cardPadding,
        rowY + rowHeight * 0.35,
        6 * uiScale,
        rowHeight * 0.48,
        3 * uiScale,
      );
      context.fill();
      context.textAlign = "left";
      context.fillStyle = "#ffffff";
      context.font = `600 ${Math.round(15 * uiScale * sizeScale)}px "CV Plus Jakarta Sans", system-ui, sans-serif`;
      context.fillText(
        fitCanvasText(context, team.name.toUpperCase(), cardWidth * 0.54),
        cardX + cardPadding + 18 * uiScale,
        rowY + rowHeight * 0.58,
      );
      context.textAlign = "right";
      context.font = `600 ${Math.round(26 * uiScale * sizeScale)}px "CV Plus Jakarta Sans", system-ui, sans-serif`;
      context.fillText(
        String(team.score),
        cardX + cardWidth - cardPadding,
        rowY + rowHeight * 0.58,
      );
    });
    const metaY = panelY + rowHeight * 2;
    context.strokeStyle = "rgba(255,255,255,0.24)";
    context.beginPath();
    context.moveTo(cardX, metaY);
    context.lineTo(cardX + cardWidth, metaY);
    context.stroke();
    context.fillStyle = "#c2c9d2";
    context.font = `600 ${Math.round(10 * uiScale * sizeScale)}px "CV Plus Jakarta Sans", system-ui, sans-serif`;
    context.textAlign = "left";
    context.fillText(
      `SET ${match.setNumber}`,
      cardX + cardPadding,
      metaY + panelHeight * 0.13,
    );
    context.textAlign = "right";
    context.fillText(
      `SETS ${match.homeSetsWon}–${match.awaySetsWon}`,
      cardX + cardWidth - cardPadding,
      metaY + panelHeight * 0.13,
    );

  }


  // Keep every completed set readable; winner badges follow the approved DOM scoreboard.
  // A maximum of three set cells per row avoids truncating history on portrait PiP.
  const historyTop = scoreboardLayout === "score-bar"
    ? panelY + panelHeight
    : panelY + panelHeight - 22 * uiScale * sizeScale;
  const cellWidth = (cardWidth - cardPadding * 2) / Math.min(3, Math.max(1, completedSets.length));
  completedSets.forEach((set, index) => {
    const x = cardX + cardPadding + (index % 3 + 0.5) * cellWidth;
    const y = historyTop + (Math.floor(index / 3) + 0.5) * 22 * uiScale * sizeScale;
    const homeWon = set.homeScore > set.awayScore;
    const awayWon = set.awayScore > set.homeScore;
    const text = `S${set.setNumber} ${set.homeScore}${homeWon ? " W" : ""}–${set.awayScore}${awayWon ? " W" : ""}`;
    context.font = `600 ${Math.round(10 * uiScale * sizeScale)}px "CV Plus Jakarta Sans", system-ui, sans-serif`;
    context.textAlign = "center";
    context.fillStyle = "#d6dbe2";
    // Canvas maxWidth scales intact text instead of dropping set scores or winner markers.
    context.fillText(text, x, y, cellWidth - 4 * uiScale);
  });

  if (match.timeoutTeamName !== undefined) {
    roundedRect(
      context,
      cardX,
      cardY,
      cardWidth,
      timeoutHeight - 6 * uiScale,
      8 * uiScale,
    );
    context.fillStyle = "rgba(55, 32, 4, 0.9)";
    context.fill();
    context.strokeStyle = "#ffb320";
    context.stroke();
    context.textAlign = "center";
    context.fillStyle = "#ffb320";
    context.font = `600 ${Math.round(11 * uiScale * sizeScale)}px "CV Plus Jakarta Sans", system-ui, sans-serif`;
    context.fillText(
      `TIMEOUT — ${match.timeoutTeamName || "MATCH PAUSED"}`,
      cardX + cardWidth / 2,
      cardY + (timeoutHeight - 6 * uiScale) / 2,
    );
  }
  context.restore();
};

