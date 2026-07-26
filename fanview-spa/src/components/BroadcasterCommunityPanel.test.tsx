import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { CommunityAdapter } from "../adapters/contracts";
import { BroadcasterCommunityPanel } from "./BroadcasterCommunityPanel";

const adapter = (): CommunityAdapter => ({
  async loadRoom() {
    return {
      connection: "connected",
      participantCount: 2,
      canWriteText: true,
      messages: [
        {
          id: "message-1",
          author: "Maya",
          initials: "M",
          role: "Fan",
          body: "Great job!",
          avatarTone: "lavender",
          reactions: [],
        },
      ],
    };
  },
  async sendCheer() {
    throw new Error("Broadcaster view must not send.");
  },
  async sendMessage() {
    throw new Error("Broadcaster view must not send.");
  },
});

describe("Broadcaster Community panel", () => {
  it("shows live messages without rendering cheer or composer controls", async () => {
    render(
      <BroadcasterCommunityPanel
        adapter={adapter()}
        onOpenChange={() => {}}
        open
        shareId="test-share"
        teamName="14s Blue"
      />,
    );

    expect(await screen.findByText("Great job!")).toBeVisible();
    expect(screen.getByText("14s Blue Cheering Section")).toBeVisible();
    expect(
      screen.queryByRole("button", { name: /send/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("textbox"),
    ).not.toBeInTheDocument();
  });

  it("closes through the explicit broadcaster toggle", () => {
    const onOpenChange = vi.fn();
    render(
      <BroadcasterCommunityPanel
        adapter={adapter()}
        onOpenChange={onOpenChange}
        open
        shareId="test-share"
        teamName="14s Blue"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Hide Fan chat" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
