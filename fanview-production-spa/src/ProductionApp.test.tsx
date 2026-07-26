import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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

  it("offers the classic viewer for a temporary initial failure", async () => {
    renderApp({
      async loadSnapshot() {
        throw new Error("network unavailable");
      },
    });
    expect(await screen.findByText("FanView is reconnecting")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Use classic FanView" }),
    ).toHaveAttribute("href", "/fanview/legacy/match-123");
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
