import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  failed: boolean;
}

export class CommunityErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("[FanView SPA] Community isolated after a render failure.", {
      error,
      componentStack: info.componentStack,
    });
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <aside
        aria-label="Live community unavailable"
        className="community-panel community-panel--failed"
        data-testid="community-error-boundary"
      >
        <div className="community-failure-copy" role="status">
          <strong>Cheering is temporarily unavailable.</strong>
          <span>The live match, score, and viewer experience are still running.</span>
        </div>
      </aside>
    );
  }
}
