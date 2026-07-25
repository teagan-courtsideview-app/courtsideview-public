import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";
import type { CommunityAdapter } from "./adapters/contracts";
import { createFixtureCommunityAdapter } from "./adapters/fixtureCommunityAdapter";

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
    await waitFor(() => {
      expect(
        screen.getByText("Cheering is temporarily unavailable."),
      ).toBeVisible();
    });
    expect(screen.getByText("18")).toBeVisible();
    expect(screen.getByText("16")).toBeVisible();
  });

  it("renders the approved community fixture only when enabled", async () => {
    render(
      <App
        communityAdapter={createFixtureCommunityAdapter()}
        flags={{ communityEnabled: true }}
        shareId="test-share"
      />,
    );

    expect(
      await screen.findByRole("dialog", {
        name: "14s Blue Cheering Section",
      }),
    ).toBeVisible();
    expect(screen.getByText("LIVE COMMUNITY")).toBeVisible();
    expect(
      screen.getByText(
        "Cheer kindly. No player criticism or personal information.",
      ),
    ).toBeVisible();
  });
});
