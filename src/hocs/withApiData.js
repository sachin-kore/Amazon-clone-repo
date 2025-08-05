import React, { useState, useEffect } from 'react';

/**
 * Higher-Order Component for API Data Fetching
 * This HOC handles data fetching, loading states, and error handling
 */
const withApiData = (WrappedComponent, apiConfig) => {
  const ApiDataComponent = (props) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refetchTrigger, setRefetchTrigger] = useState(0);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          setError(null);

          // Get the API URL - can be a function or string
          const url = typeof apiConfig.url === 'function' 
            ? apiConfig.url(props) 
            : apiConfig.url;

          // Get the fetch options
          const options = apiConfig.options ? apiConfig.options(props) : {};

          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              ...options.headers
            },
            ...options
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          
          // Transform data if transformer is provided
          const transformedData = apiConfig.transformer 
            ? apiConfig.transformer(result)
            : result;

          setData(transformedData);
        } catch (err) {
          setError(err);
          console.error('API fetch error:', err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, [refetchTrigger, ...Object.values(props).filter(val => 
      typeof val === 'string' || typeof val === 'number'
    )]);

    const refetch = () => {
      setRefetchTrigger(prev => prev + 1);
    };

    // Render loading state
    if (isLoading) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          minHeight: '200px'
        }}>
          <div style={{
            textAlign: 'center'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px'
            }}></div>
            <div>Fetching data...</div>
          </div>
        </div>
      );
    }

    // Render error state
    if (error) {
      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          border: '2px solid #e74c3c',
          borderRadius: '8px',
          backgroundColor: '#fadbd8',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#c0392b', marginBottom: '12px' }}>
            Failed to load data
          </h3>
          <p style={{ color: '#7b241c', marginBottom: '16px' }}>
            {error.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={refetch}
            style={{
              padding: '8px 16px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    // Render the wrapped component with data
    return (
      <WrappedComponent
        {...props}
        data={data}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
      />
    );
  };

  // Set display name for debugging
  ApiDataComponent.displayName = `withApiData(${WrappedComponent.displayName || WrappedComponent.name})`;

  return ApiDataComponent;
};

/**
 * Factory function to create API HOCs with specific configurations
 */
export const createApiHOC = (apiConfig) => (WrappedComponent) => 
  withApiData(WrappedComponent, apiConfig);

/**
 * Example usage configurations
 */
export const withUsersData = createApiHOC({
  url: 'https://jsonplaceholder.typicode.com/users',
  transformer: (data) => data.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    company: user.company.name
  }))
});

export const withPostsData = createApiHOC({
  url: (props) => `https://jsonplaceholder.typicode.com/posts${props.userId ? `?userId=${props.userId}` : ''}`,
  transformer: (data) => data.slice(0, 10) // Limit to 10 posts
});

export const withUserDetails = createApiHOC({
  url: (props) => `https://jsonplaceholder.typicode.com/users/${props.userId}`,
  options: (props) => ({
    headers: {
      'Authorization': props.authToken ? `Bearer ${props.authToken}` : undefined
    }
  })
});

export default withApiData;