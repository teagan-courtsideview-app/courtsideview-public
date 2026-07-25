import { waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { CommunityRoomSnapshot } from "./contracts";
import {
  createSupabaseCommunityAdapter,
  type CommunitySupabaseClient,
} from "./supabaseCommunityAdapter";

const session = {
  access_token: "test-access-token",
  user: { id: "11111111-1111-4111-8111-111111111111" },
};

class TestChannel {
  private handlers = new Map<string, () => void>();

  on(
    type: "broadcast" | "presence",
    filter: Record<string, string>,
    callback: () => void,
  ) {
    this.handlers.set(`${type}:${filter.event}`, callback);
    return this;
  }

  presenceState() {
    return { viewer: [{ online_at: "now" }] };
  }

  subscribe(callback: (status: string) => void) {
    queueMicrotask(() => callback("SUBSCRIBED"));
    return this;
  }

  async track() {
    this.handlers.get("presence:sync")?.();
  }
}

describe("Supabase Community adapter", () => {
  it("joins, subscribes before history hydration, and sends canonical cheers", async () => {
    const operations: Array<{
      operation: string;
      input: Record<string, unknown>;
      idempotencyKey: string | null;
    }> = [];
    const fetchMock = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const request = JSON.parse(String(init?.body)) as {
        operation: string;
        input: Record<string, unknown>;
      };
      const headers = new Headers(init?.headers);
      operations.push({
        ...request,
        idempotencyKey: headers.get("Idempotency-Key"),
      });
      if (request.operation === "join_room") {
        return new Response(
          JSON.stringify({
            data: {
              room_id: "22222222-2222-4222-8222-222222222222",
              mode: "cheers",
              status: "open",
            },
          }),
          { status: 200 },
        );
      }
      if (request.operation === "list_messages") {
        return new Response(
          JSON.stringify({
            data: {
              mode: "cheers",
              status: "open",
              messages: [
                {
                  id: "33333333-3333-4333-8333-333333333333",
                  type: "cheer",
                  body: "clap",
                  display_name: "Fan",
                  moderation_status: "visible",
                },
              ],
            },
          }),
          { status: 200 },
        );
      }
      return new Response(
        JSON.stringify({
          data: {
            id: "44444444-4444-4444-8444-444444444444",
            type: "cheer",
            body: request.input.body,
          },
        }),
        { status: 200 },
      );
    }) as unknown as typeof globalThis.fetch;

    const channel = new TestChannel();
    const client: CommunitySupabaseClient = {
      auth: {
        getSession: vi.fn(async () => ({
          data: { session },
          error: null,
        })),
        signInAnonymously: vi.fn(async () => ({
          data: { session, user: session.user },
          error: null,
        })),
      },
      channel: vi.fn(() => channel),
      realtime: { setAuth: vi.fn(async () => undefined) },
      removeChannel: vi.fn(async () => undefined),
    };
    const adapter = createSupabaseCommunityAdapter({
      client,
      displayName: "Fan",
      fetch: fetchMock,
      gatewayUrl:
        "https://example.supabase.co/functions/v1/fanview-community",
      publishableKey: "publishable-test-key",
    });

    const initial = await adapter.loadRoom(
      "share-123",
      new AbortController().signal,
    );
    expect(initial.connection).toBe("connecting");
    expect(initial.canWriteText).toBe(false);
    expect(client.auth.signInAnonymously).not.toHaveBeenCalled();

    const snapshots: CommunityRoomSnapshot[] = [];
    const unsubscribe = adapter.subscribe?.(
      "share-123",
      (snapshot) => snapshots.push(snapshot),
      (error) => {
        throw error;
      },
    );

    await waitFor(() => {
      expect(operations.map(({ operation }) => operation)).toEqual([
        "join_room",
        "list_messages",
      ]);
    });
    expect(snapshots.at(-1)).toMatchObject({
      connection: "connected",
      participantCount: 1,
      canWriteText: false,
      messages: [],
    });

    await adapter.sendCheer("share-123", "🙌");
    const sent = operations.at(-1);
    expect(sent).toMatchObject({
      operation: "send_message",
      input: {
        roomId: "22222222-2222-4222-8222-222222222222",
        messageType: "cheer",
        body: "celebrate",
      },
    });
    expect(sent?.idempotencyKey).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );

    unsubscribe?.();
    expect(client.removeChannel).toHaveBeenCalledWith(channel);
  });

  it("uses anonymous auth only when no session exists", async () => {
    const client: CommunitySupabaseClient = {
      auth: {
        getSession: vi.fn(async () => ({
          data: { session: null },
          error: null,
        })),
        signInAnonymously: vi.fn(async () => ({
          data: { session, user: session.user },
          error: null,
        })),
      },
      channel: vi.fn(() => new TestChannel()),
      realtime: { setAuth: vi.fn(async () => undefined) },
      removeChannel: vi.fn(async () => undefined),
    };
    const adapter = createSupabaseCommunityAdapter({
      client,
      fetch: vi.fn(async () =>
        new Response(
          JSON.stringify({
            data: {
              room_id: "22222222-2222-4222-8222-222222222222",
              mode: "cheers",
              status: "open",
            },
          }),
          { status: 200 },
        ),
      ) as unknown as typeof globalThis.fetch,
      gatewayUrl:
        "https://example.supabase.co/functions/v1/fanview-community",
      publishableKey: "publishable-test-key",
    });

    await adapter.loadRoom("share-123", new AbortController().signal);
    expect(client.auth.signInAnonymously).toHaveBeenCalledTimes(1);
  });
});
