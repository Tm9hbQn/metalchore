import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Skull, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center text-white" dir="rtl">
          <Skull className="w-24 h-24 text-red-500 mb-6 opacity-80" />
          <h1 className="text-2xl font-bold mb-2">משהו נשרף פה.</h1>
          <p className="text-gray-400 mb-8 max-w-sm">
            הקוד קרס אל תוך התהום. אל תדאגו, אנחנו נתקן את זה לפני יום הדין.
          </p>

          {/* Debug info if needed in development, but hidden from general users normally */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 max-w-sm w-full text-start overflow-x-auto text-xs text-red-300 hidden">
              {this.state.error?.message}
          </div>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            נסו להחיות
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
