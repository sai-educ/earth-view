import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render-time failures (including WebGL context creation errors on
 * unsupported devices) so the public site shows a recoverable message instead
 * of a blank page.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Earth View failed to render:", error, info);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="flex h-dvh w-screen flex-col items-center justify-center gap-4 bg-space p-8 text-center">
        <h1 className="text-lg font-semibold text-foreground">Something went wrong</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Earth View needs a modern browser with WebGL enabled. Try reloading, or
          open the site in an up-to-date browser.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-md border border-white/15 bg-background/70 px-4 py-2 text-sm text-foreground transition-colors hover:bg-background"
        >
          Reload
        </button>
      </div>
    );
  }
}
