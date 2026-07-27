import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { App } from "./App";
import type {
  CommunityAdapter,
  CommunityRoomSnapshot,
} from "./adapters/contracts";
import { createFixtureCommunityAdapter } from "./adapters/fixtureCommunityAdapter";

afterEach(cleanup);

describe("FanView SPA isolation", () => {
  it("does not mount community when the feature flag is off", async () => {
    render(
      <App
        flags={{ communityEnabled: false }}
        shareId="test-share"
      />,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(await screen.findByLabelText("Live match score")).toBeVisible();
  });

  it("keeps video and scoring available when community fails", async () => {
    const failingCommunity: CommunityAdapter = {
      async loadRoom() {
        throw new Error("Fixture chat unavailable");
      },
      async sendCheer() {
        throw new Error("Fixture chat unavailable");
      },
      async sendMessage() {
        throw new Error("Fixture chat unavailable");
      },
    };

    render(
      <App
        communityAdapter={failingCommunity}
        flags={{ communityEnabled: true }}
        shareId="test-share"
      />,
    );

    expect(await screen.findByLabelText("Live match score")).toBeVisible();
    expect(screen.getByAltText(/live indoor volleyball rally/i)).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: /open chat/i }));
    await waitFor(() => {
      expect(
        screen.getByText("Cheering is temporarily unavailable."),
      ).toBeVisible();
    });
    const score = screen.getByRole("region", { name: "Live match score" });
    expect(within(score).getAllByText("18")[0]).toBeVisible();
    expect(within(score).getAllByText("16")[0]).toBeVisible();
  });

  it("renders the approved community fixture only when enabled", async () => {
    render(
      <App
        communityAdapter={createFixtureCommunityAdapter()}
        flags={{ communityEnabled: true }}
        shareId="test-share"
      />,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /open chat/i }));
    expect(
      await screen.findByRole("dialog", { name: "14s Blue Cheering Section" }),
    ).toBeVisible();
    expect(screen.getByText("LIVE COMMUNITY")).toBeVisible();
    expect(
      screen.getByText(
        "Cheer kindly. No player criticism or personal information.",
      ),
    ).toBeVisible();
  });

  it("shows a loading state instead of claiming the room is empty", async () => {
    const loadingCommunity: CommunityAdapter = {
      async loadRoom() {
        return await new Promise<CommunityRoomSnapshot>(() => {});
      },
      async sendCheer() {
        throw new Error("Not ready");
      },
      async sendMessage() {
        throw new Error("Not ready");
      },
    };

    render(
      <App
        communityAdapter={loadingCommunity}
        flags={{ communityEnabled: true }}
        shareId="test-share"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /open chat/i }));
    expect(screen.getByLabelText("Loading community")).toBeVisible();
    expect(
      screen.queryByText("Be the first to send a positive cheer for the team."),
    ).not.toBeInTheDocument();
  });

  it("collapses anonymous Fan identity into one useful label", async () => {
    const anonymousCommunity: CommunityAdapter = {
      async loadRoom() {
        return {
          connection: "connected",
          participantCount: 1,
          canWriteText: true,
          messages: [
            {
              id: "anonymous",
              author: "F",
              initials: "F",
              role: "Fan",
              body: "Great rally!",
              avatarTone: "lavender",
              reactions: [],
            },
          ],
        };
      },
      async sendCheer() {
        return;
      },
      async sendMessage() {
        throw new Error("Not used");
      },
    };

    render(
      <App
        communityAdapter={anonymousCommunity}
        flags={{ communityEnabled: true }}
        shareId="test-share"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /open chat/i }));
    expect(await screen.findByText("Fan viewer")).toBeVisible();
    expect(screen.queryByText("Fan")).not.toBeInTheDocument();
  });

  it("closes with Escape and removes the sheet from the accessibility tree", async () => {
    render(
      <App
        communityAdapter={createFixtureCommunityAdapter()}
        flags={{ communityEnabled: true }}
        shareId="test-share"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /open chat/i }));
    expect(
      await screen.findByRole("dialog", { name: "14s Blue Cheering Section" }),
    ).toBeVisible();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /open chat/i }),
    ).toHaveFocus();
  });
});
