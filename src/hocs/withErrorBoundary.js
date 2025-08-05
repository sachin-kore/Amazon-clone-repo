import React from 'react';

/**
 * Higher-Order Component for Error Boundary
 * This HOC wraps components with error handling capability
 * and displays a fallback UI when errors occur
 */
const withErrorBoundary = (WrappedComponent, ErrorFallback) => {
  class ErrorBoundaryHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        hasError: false, 
        error: null,
        errorInfo: null 
      };
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // You can log the error to an error reporting service here
      console.error('Error caught by HOC Error Boundary:', error, errorInfo);
      
      this.setState({
        error,
        errorInfo
      });

      // Example: Log to external service
      // logErrorToService(error, errorInfo);
    }

    handleRetry = () => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null
      });
    };

    render() {
      if (this.state.hasError) {
        // Custom error fallback component
        if (ErrorFallback) {
          return (
            <ErrorFallback 
              error={this.state.error}
              errorInfo={this.state.errorInfo}
              onRetry={this.handleRetry}
            />
          );
        }

        // Default error fallback UI
        return (
          <div style={{
            padding: '20px',
            margin: '20px',
            border: '2px solid #ff6b6b',
            borderRadius: '8px',
            backgroundColor: '#ffe0e0',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#d63031', marginBottom: '16px' }}>
              🚨 Something went wrong!
            </h2>
            <p style={{ color: '#636e72', marginBottom: '16px' }}>
              An error occurred while rendering this component.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ 
                textAlign: 'left', 
                marginBottom: '16px',
                padding: '12px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '4px'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  Error Details (Development)
                </summary>
                <pre style={{ 
                  fontSize: '12px', 
                  color: '#e17055',
                  whiteSpace: 'pre-wrap',
                  marginTop: '8px'
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <button
              onClick={this.handleRetry}
              style={{
                padding: '10px 20px',
                backgroundColor: '#00b894',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Try Again
            </button>
          </div>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  // Set display name for debugging
  ErrorBoundaryHOC.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return ErrorBoundaryHOC;
};

/**
 * Custom Error Fallback Component
 */
export const DefaultErrorFallback = ({ error, errorInfo, onRetry }) => (
  <div style={{
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    margin: '20px'
  }}>
    <div style={{ fontSize: '48px', marginBottom: '16px' }}>😞</div>
    <h2 style={{ color: '#495057', marginBottom: '16px' }}>
      Oops! Something broke
    </h2>
    <p style={{ color: '#6c757d', marginBottom: '24px' }}>
      We're sorry for the inconvenience. Please try refreshing the page.
    </p>
    <button
      onClick={onRetry}
      style={{
        padding: '12px 24px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px'
      }}
    >
      Retry
    </button>
  </div>
);

export default withErrorBoundary;