import React, { useState, useEffect } from 'react';

/**
 * Higher-Order Component for Authentication
 * This HOC wraps components that require authentication
 * and provides authentication state and logic
 */
const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Simulate authentication check
      const checkAuth = async () => {
        try {
          // In a real app, this would be an API call
          const token = localStorage.getItem('authToken');
          if (token) {
            // Simulate API call to validate token
            setTimeout(() => {
              setUser({ id: 1, name: 'John Doe', email: 'john@example.com' });
              setIsAuthenticated(true);
              setIsLoading(false);
            }, 1000);
          } else {
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Authentication check failed:', error);
          setIsLoading(false);
        }
      };

      checkAuth();
    }, []);

    const login = (email, password) => {
      // Simulate login logic
      if (email && password) {
        localStorage.setItem('authToken', 'fake-jwt-token');
        setUser({ id: 1, name: 'John Doe', email });
        setIsAuthenticated(true);
      }
    };

    const logout = () => {
      localStorage.removeItem('authToken');
      setUser(null);
      setIsAuthenticated(false);
    };

    if (isLoading) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '200px' 
        }}>
          <div>Loading...</div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          border: '1px solid #ddd',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <h3>Authentication Required</h3>
          <p>Please log in to access this content.</p>
          <button 
            onClick={() => login('user@example.com', 'password')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Login (Demo)
          </button>
        </div>
      );
    }

    // Pass all original props plus auth-related props to the wrapped component
    return (
      <WrappedComponent
        {...props}
        user={user}
        isAuthenticated={isAuthenticated}
        login={login}
        logout={logout}
      />
    );
  };

  // Set display name for debugging
  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  return AuthenticatedComponent;
};

export default withAuth;