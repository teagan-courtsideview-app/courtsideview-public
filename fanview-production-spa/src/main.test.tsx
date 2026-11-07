import type { ReactElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createClient: vi.fn(),
  render: vi.fn(),
  fanViewAdapter: vi.fn(),
  communityAdapter: vi.fn(),
  configureViewerRequests: vi.fn(),
}));
vi.mock("@supabase/supabase-js", () => ({ createClient: mocks.createClient }));
vi.mock("react-dom/client", () => ({ createRoot: () => ({ render: mocks.render }) }));
vi.mock("./supabaseFanViewAdapter", () => ({ createSupabaseFanViewAdapter: mocks.fanViewAdapter }));
vi.mock("../../fanview-spa/src/adapters/supabaseCommunityAdapter", () => ({ createSupabaseCommunityAdapter: mocks.communityAdapter }));
vi.mock("./viewerFetch", () => ({ configureViewerRequests: mocks.configureViewerRequests, viewerFetch: vi.fn() }));
vi.mock("./ProductionApp", () => ({ ProductionApp: function ProductionApp() { return null; } }));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  document.body.innerHTML = '<div id="root"></div>';
  window.history.replaceState({}, "", "/v/match-123");
  mocks.fanViewAdapter.mockReturnValue({ kind: "public-match" });
  mocks.communityAdapter.mockReturnValue({ kind: "account-community" });
});
afterEach(() => {
  document.body.innerHTML = "";
  window.history.replaceState({}, "", "/");
});

describe("production guest entrypoint", () => {
  it.each(["signed-out", "expired", "unverified", "verified"])(
    "mounts the viewer directly with an isolated public client for a %s account",
    async (sessionState) => {
      const accountClient = { auth: {
        getSession: vi.fn(() => { throw new Error(`Optional ${sessionState} account must not gate viewing`); }),
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      } };
      const publicClient = { kind: "nonpersistent-public-client" };
      mocks.createClient.mockReturnValueOnce(accountClient).mockReturnValueOnce(publicClient);
      await import("./main");
      expect(mocks.createClient).toHaveBeenNthCalledWith(2, expect.any(String), expect.any(String), {
        auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false, storageKey: "courtsideview_fanview_public" },
      });
      expect(mocks.fanViewAdapter).toHaveBeenCalledWith(expect.objectContaining({ client: publicClient }));
      expect(mocks.communityAdapter).toHaveBeenCalledWith(expect.objectContaining({ client: accountClient }));
      expect(mocks.configureViewerRequests).toHaveBeenCalledWith(expect.any(String));
      expect(accountClient.auth.getSession).not.toHaveBeenCalled();
      const tree = mocks.render.mock.calls[0][0] as ReactElement<{ children: ReactElement<{ shareId: string }> }>;
      const app = tree.props.children;
      expect((app.type as { name: string }).name).toBe("ProductionApp");
      expect(app.props.shareId).toBe("match-123");
    },
  );
});
