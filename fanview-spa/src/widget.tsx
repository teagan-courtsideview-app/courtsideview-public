import { createRoot, type Root } from "react-dom/client";
import { createSupabaseCommunityAdapter } from "./adapters/supabaseCommunityAdapter";
import type {
  CommunityAdapter,
} from "./adapters/contracts";
import { fixtureCommunityAdapter } from "./adapters/fixtureCommunityAdapter";
import { CommunityErrorBoundary } from "./components/CommunityErrorBoundary";
import { BroadcasterCommunityPanel } from "./components/BroadcasterCommunityPanel";
import { CommunityPanel } from "./components/CommunityPanel";
import styles from "./styles.css?inline";

export interface FanViewCommunityWidgetConfig {
  adapter?: CommunityAdapter;
  client?: Parameters<typeof createSupabaseCommunityAdapter>[0]["client"];
  demo?: boolean;
  displayName?: string;
  gatewayUrl?: string;
  matchComplete?: boolean;
  open?: boolean;
  publishableKey?: string;
  shareId: string;
  startOpen?: boolean;
  surface?: "viewer" | "broadcaster";
  teamName: string;
}

const HOST_STYLES = `
  :host {
    --fanview-navy-950: #111827;
    --fanview-pink-500: #f22b78;
    --fanview-pink-700: #ce155f;
    --fanview-paper: #fffdfb;
    --fanview-blush: #fff2f7;
    --fanview-muted: #697386;
    --fanview-live-red: #e53935;
    --fanview-live-green: #39d98a;
    --fanview-line: rgba(15, 23, 42, 0.1);
    color: #111827;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; }
  button, input { font: inherit; }
`;

export class FanViewCommunityWidgetElement extends HTMLElement {
  private adapter: CommunityAdapter | null = null;
  private config: FanViewCommunityWidgetConfig | null = null;
  private root: Root | null = null;
  private readonly mountPoint: HTMLDivElement;
  private readonly reportBroadcasterMessageIds = (messageIds: string[]) => {
    this.dispatchEvent(
      new CustomEvent("community-message-change", {
        detail: { messageIds },
      }),
    );
  };

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `${HOST_STYLES}\n${styles}`;
    this.mountPoint = document.createElement("div");
    shadow.append(style, this.mountPoint);
  }

  connectedCallback(): void {
    this.renderWidget();
  }

  disconnectedCallback(): void {
    this.root?.unmount();
    this.root = null;
  }

  configure(config: FanViewCommunityWidgetConfig): void {
    this.config = { ...config };
    this.renderWidget();
  }

  setMatchComplete(matchComplete: boolean): void {
    if (!this.config || this.config.matchComplete === matchComplete) return;
    this.config = { ...this.config, matchComplete };
    this.renderWidget();
  }

  openCommunity(): void {
    this.setCommunityOpen(true);
  }

  closeCommunity(): void {
    this.setCommunityOpen(false);
  }

  toggleCommunity(): void {
    this.setCommunityOpen(!(this.config?.open ?? false));
  }

  private setCommunityOpen(open: boolean): void {
    if (!this.config || this.config.open === open) return;
    this.config = { ...this.config, open };
    this.renderWidget();
    this.dispatchEvent(
      new CustomEvent("community-open-change", {
        detail: { open },
      }),
    );
  }

  private renderWidget(): void {
    if (!this.isConnected || !this.config) return;
    const config = this.config;
    const adapter =
      config.adapter ??
      this.adapter ??
      (config.demo
        ? fixtureCommunityAdapter
        : config.client && config.gatewayUrl && config.publishableKey
          ? createSupabaseCommunityAdapter({
              client: config.client,
              gatewayUrl: config.gatewayUrl,
              publishableKey: config.publishableKey,
              displayName: config.displayName,
            })
          : null);
    if (!adapter) return;
    if (!config.adapter) this.adapter = adapter;
    this.root ??= createRoot(this.mountPoint);
    if (config.surface === "broadcaster") {
      this.root.render(
        <CommunityErrorBoundary>
          <BroadcasterCommunityPanel
            adapter={adapter}
            onMessageIdsChange={this.reportBroadcasterMessageIds}
            onOpenChange={(open) => this.setCommunityOpen(open)}
            open={config.open ?? false}
            shareId={config.shareId}
            teamName={config.teamName}
          />
        </CommunityErrorBoundary>,
      );
      return;
    }
    this.root.render(
      <CommunityErrorBoundary>
        <CommunityPanel
          adapter={adapter}
          matchComplete={Boolean(config.matchComplete)}
          shareId={config.shareId}
          startOpen={config.startOpen ?? true}
          teamName={config.teamName}
        />
      </CommunityErrorBoundary>,
    );
  }
}

if (!customElements.get("fanview-community-widget")) {
  customElements.define(
    "fanview-community-widget",
    FanViewCommunityWidgetElement,
  );
}

export { createSupabaseCommunityAdapter };
