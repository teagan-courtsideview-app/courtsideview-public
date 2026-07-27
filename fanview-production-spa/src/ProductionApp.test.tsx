import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import fs from "node:fs";
import path from "node:path";
import type {
  CommunityAdapter,
  FanViewAdapter,
  FanViewSnapshot,
} from "../../fanview-spa/src/adapters/contracts";
import { FanViewUnavailableError } from "../../fanview-spa/src/adapters/contracts";
import { scoreBugTextColor } from "../../fanview-spa/src/components/ScoreBug";
import { ProductionApp } from "./ProductionApp";

afterEach(cleanup);

const snapshot = (updatedAt: string, homeScore: number): FanViewSnapshot => ({
  shareId: "match-123",
  match: {
    setNumber: 2,
    setTarget: 25,
    totalSets: 3,
    homeSetsWon: 1,
    awaySetsWon: 0,
    isComplete: false,
    isLive: true,
    updatedAt,
    home: { name: "14s Blue", score: homeScore, color: "#1556C0" },
    away: { name: "Metro Red", score: 16, color: "#EA2850" },
  },
  media: { kind: "none", alt: "No video" },
  viewerCount: 12,
  activity: [],
  connection: "connected",
});

const community: CommunityAdapter = {
  async loadRoom() {
    throw new Error("disabled");
  },
  async sendCheer() {},
  async sendMessage() {
    throw new Error("disabled");
  },
};

const renderApp = (adapter: FanViewAdapter) =>
  render(
    <ProductionApp
      communityAdapter={community}
      communityEnabled={false}
      fanViewAdapter={adapter}
      liveWorkerUrl="https://worker.example"
      shareId="match-123"
    />,
  );

describe("Production FanView lifecycle", () => {
  it("uses readable scoreboard text for white and bright team colors", () => {
    expect(scoreBugTextColor("#FFFFFF")).toBe("#101827");
    expect(scoreBugTextColor("#10B981")).toBe("#101827");
    expect(scoreBugTextColor("#111827")).toBe("#FFFFFF");
  });

  it("keeps the live set tally and match format visible in the score bug", () => {
    const source = fs.readFileSync(
      path.resolve(
        __dirname,
        "../../fanview-spa/src/components/ScoreBug.tsx",
      ),
      "utf8",
    );
    expect(source).toContain("match.homeSetsWon");
    expect(source).toContain("match.awaySetsWon");
    expect(source).toContain("BEST OF {match.totalSets}");
    expect(source).toContain("sets won");
  });

  it("keeps Display closed until requested and persists approved scoreboard choices", async () => {
    window.localStorage.clear();
    renderApp({
      async loadSnapshot() {
        return snapshot("2026-07-25T20:01:00.000Z", 18);
      },
    });
    await screen.findByText("18");
    expect(
      screen.queryByRole("dialog", { name: "Scoreboard display" }),
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Scoreboard display" }),
    );
    expect(
      screen.getByRole("dialog", { name: "Scoreboard display" }),
    ).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Small" }));
    fireEvent.click(screen.getByRole("button", { name: "Top right" }));

    expect(screen.getByTestId("fanview-production-app")).toHaveAttribute(
      "data-scoreboard-size",
      "small",
    );
    expect(screen.getByTestId("fanview-production-app")).toHaveAttribute(
      "data-scoreboard-position",
      "top-right",
    );
    expect(
      window.localStorage.getItem("courtsideview_fanview_scoreboard_size"),
    ).toBe("small");
    expect(
      window.localStorage.getItem("courtsideview_fanview_scoreboard_position"),
    ).toBe("top-right");
  });

  it("uses one aligned ledger without duplicating the live set", async () => {
    const live = snapshot("2026-07-25T20:01:00.000Z", 12);
    live.match.setNumber = 3;
    live.match.totalSets = 5;
    live.match.homeSetsWon = 1;
    live.match.awaySetsWon = 1;
    live.match.completedSets = [
      { setNumber: 1, homeScore: 25, awayScore: 21 },
      { setNumber: 2, homeScore: 21, awayScore: 25 },
      { setNumber: 3, homeScore: 12, awayScore: 16 },
    ];
    renderApp({
      async loadSnapshot() {
        return live;
      },
    });
    await screen.findByText("BEST OF 5");
    expect(screen.getAllByText("S3")).toHaveLength(1);
    expect(
      screen.getByLabelText("14s Blue won set 1"),
    ).toHaveTextContent("W");
    expect(
      screen.getByLabelText("Metro Red won set 2"),
    ).toHaveTextContent("W");
    expect(screen.queryByText("WIN")).not.toBeInTheDocument();
  });

  it("does not duplicate timeout activity outside the persistent timeout banner", async () => {
    const timedOut = snapshot("2026-07-25T20:01:00.000Z", 12);
    timedOut.match.timeoutTeamName = "14s Blue";
    timedOut.latestAction = "Timeout called by 14s Blue";
    renderApp({
      async loadSnapshot() {
        return timedOut;
      },
    });
    expect(await screen.findByText("TIMEOUT — 14s Blue")).toBeVisible();
    expect(
      screen.queryByText("Timeout called by 14s Blue"),
    ).not.toBeInTheDocument();
  });

  it("renders the linked Team Hub action in the active viewer route", async () => {
    const linked = snapshot("2026-07-25T20:01:00.000Z", 18);
    linked.match.teamHub = { name: "14s Blue", slug: "14s-blue" };
    renderApp({
      async loadSnapshot() {
        return linked;
      },
    });
    expect(
      await screen.findByRole("link", { name: "Back to 14s Blue Team Hub" }),
    ).toHaveAttribute("href", "/t/14s-blue");
  });

  it("does not place a dark shade over live video", () => {
    const source = fs.readFileSync(
      path.resolve(__dirname, "ProductionApp.tsx"),
      "utf8",
    );
    expect(source).toContain(
      "!hasVideo ? <div className=\"match-stage__shade\"",
    );
  });

  it("allows the live video to continue in browser picture-in-picture", () => {
    const source = fs.readFileSync(
      path.resolve(__dirname, "LiveMedia.tsx"),
      "utf8",
    );
    expect(source).toContain("playsInline");
    expect(source).not.toContain("disablePictureInPicture");
    expect(source).toContain("requestPictureInPicture");
    expect(source).toContain("webkitSetPresentationMode");
    expect(source).toContain('aria-label={floating ? "Return floating video" : "Float live video"}');
    expect(source).toContain('window.addEventListener("pageshow"');
    expect(source).toContain('document.addEventListener("visibilitychange"');
  });

  it("uses an upright custom play control instead of the rotated native overlay", () => {
    const source = fs.readFileSync(
      path.resolve(__dirname, "LiveMedia.tsx"),
      "utf8",
    );
    const css = fs.readFileSync(
      path.resolve(__dirname, "production.css"),
      "utf8",
    );
    expect(source).toContain('aria-label="Play live video"');
    expect(source).toContain("controls={false}");
    expect(source).toContain("playbackPaused && !status");
    expect(css).toContain(
      ".live-media__video::-webkit-media-controls-start-playback-button",
    );
    expect(css).toContain(".live-media__play svg");
  });

  it("keeps the mobile scoreboard and cheer launcher on one bottom baseline", () => {
    const css = fs.readFileSync(
      path.resolve(__dirname, "production.css"),
      "utf8",
    );
    expect(css).toContain("--fanview-mobile-bottom-inset");
    expect(css).toContain("--fanview-mobile-cheer-width");
    expect(css).toMatch(
      /\.score-bug\s*\{[\s\S]*?bottom: var\(--fanview-mobile-bottom-inset\)/,
    );
    expect(css).toMatch(
      /\.community-launcher\s*\{[\s\S]*?bottom: var\(--fanview-mobile-bottom-inset\)/,
    );
  });

  it("keeps live scores and corrected orientation in fullscreen", () => {
    const source = fs.readFileSync(
      path.resolve(__dirname, "LiveMedia.tsx"),
      "utf8",
    );
    expect(source).toContain('closest<HTMLElement>(".match-stage")');
    expect(source).toContain("drawPresentationFrame");
    expect(source).toContain("matchRef.current");
    expect(source).toContain("stream.video.webkitEnterFullscreen()");
    expect(source).toContain('stage.classList.add("is-web-fullscreen")');
  });

  it("composites rotated video before entering picture-in-picture", () => {
    const source = fs.readFileSync(
      path.resolve(__dirname, "LiveMedia.tsx"),
      "utf8",
    );
    expect(source).toContain("canvas.captureStream(30)");
    expect(source).toContain("sourceStream?.getAudioTracks()");
    expect(source).toContain("stream.addTrack(track.clone())");
    expect(source).toContain("rotationRef.current");
    expect(source).toContain("rotation");
    expect(source).toContain("? startPresentation()?.video");
  });

  it("does not hide the Cheering Section after a startup error", () => {
    const source = fs.readFileSync(
      path.resolve(
        __dirname,
        "../../fanview-spa/src/components/CommunityPanel.tsx",
      ),
      "utf8",
    );
    expect(source).not.toContain("if (failed && hideWhenUnavailable) return null");
    expect(source).toContain("Cheering is temporarily unavailable.");
  });

  it("fails closed for a missing public match", async () => {
    renderApp({
      async loadSnapshot() {
        throw new FanViewUnavailableError();
      },
    });
    expect(await screen.findByText("FanView unavailable")).toBeVisible();
  });

  it("offers useful recovery actions for a temporary initial failure", async () => {
    renderApp({
      async loadSnapshot() {
        throw new Error("network unavailable");
      },
    });
    expect(await screen.findByText("FanView is reconnecting")).toBeVisible();
    expect(screen.getByRole("button", { name: "Try again" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Return Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Email support" })).toHaveAttribute(
      "href",
      "mailto:teagan@courtsideviewapp.com?subject=CourtsideView%20Support",
    );
  });

  it("does not let a slow initial request overwrite newer Realtime state", async () => {
    let resolveInitial!: (value: FanViewSnapshot) => void;
    const initial = new Promise<FanViewSnapshot>((resolve) => {
      resolveInitial = resolve;
    });
    const adapter: FanViewAdapter = {
      async loadSnapshot() {
        return initial;
      },
      subscribe(_shareId, onSnapshot) {
        onSnapshot(snapshot("2026-07-25T20:02:00.000Z", 19));
        return () => {};
      },
    };
    renderApp(adapter);
    expect(await screen.findByText("19")).toBeVisible();
    await act(async () => {
      resolveInitial(snapshot("2026-07-25T20:01:00.000Z", 18));
      await initial;
    });
    expect(screen.getByText("19")).toBeVisible();
    expect(screen.queryByText("18")).not.toBeInTheDocument();
  });

  it("unsubscribes when the viewer unmounts", async () => {
    const unsubscribe = vi.fn();
    const view = renderApp({
      async loadSnapshot() {
        return snapshot("2026-07-25T20:01:00.000Z", 18);
      },
      subscribe() {
        return unsubscribe;
      },
    });
    expect(await screen.findByText("18")).toBeVisible();
    view.unmount();
    expect(unsubscribe).toHaveBeenCalledOnce();
  });
});
