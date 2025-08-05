import React from 'react';

/**
 * Higher-Order Component for Loading States
 * This HOC wraps components and shows a loading indicator
 * based on the isLoading prop
 */
const withLoading = (WrappedComponent) => {
  const LoadingComponent = (props) => {
    const { isLoading, loadingMessage = 'Loading...', ...restProps } = props;

    if (isLoading) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          minHeight: '200px'
        }}>
          {/* Loading Spinner */}
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 2s linear infinite',
            marginBottom: '16px'
          }}></div>
          
          {/* Loading Message */}
          <div style={{
            fontSize: '16px',
            color: '#666',
            textAlign: 'center'
          }}>
            {loadingMessage}
          </div>

          {/* CSS Animation */}
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      );
    }

    return <WrappedComponent {...restProps} />;
  };

  // Set display name for debugging
  LoadingComponent.displayName = `withLoading(${WrappedComponent.displayName || WrappedComponent.name})`;

  return LoadingComponent;
};

/**
 * Alternative Loading HOC with custom spinner
 */
export const withCustomLoading = (WrappedComponent, LoadingSpinner) => {
  const CustomLoadingComponent = (props) => {
    const { isLoading, ...restProps } = props;

    if (isLoading) {
      return LoadingSpinner ? <LoadingSpinner /> : <div>Loading...</div>;
    }

    return <WrappedComponent {...restProps} />;
  };

  CustomLoadingComponent.displayName = `withCustomLoading(${WrappedComponent.displayName || WrappedComponent.name})`;

  return CustomLoadingComponent;
};

export default withLoading;