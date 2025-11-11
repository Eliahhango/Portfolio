
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, RotateCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white flex flex-col items-center justify-center p-4 text-center">
          <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Something went wrong.</h1>
          <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            We're sorry for the inconvenience. An unexpected error occurred. 
            You can try refreshing the page or go back to the homepage.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-colors duration-300 shadow-lg"
            >
              <RotateCw className="w-5 h-5 mr-2" />
              <span>Refresh Page</span>
            </button>
            <Link to="/">
              <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-colors duration-300 shadow-lg">
                Go to Homepage
              </button>
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
