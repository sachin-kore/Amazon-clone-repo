import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { useStateValue } from '../StateProvider';

/**
 * Enhanced Authentication HOC using existing Firebase and StateProvider
 * This HOC integrates with the project's existing authentication system
 */
const withAmazonAuth = (WrappedComponent, options = {}) => {
  const AuthenticatedComponent = (props) => {
    const [{ user }, dispatch] = useStateValue();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    
    const {
      redirectTo = '/login',
      requireAuth = true,
      showLoginButton = true
    } = options;

    useEffect(() => {
      // Listen to Firebase auth state changes (reusing existing logic)
      const unsubscribe = auth.onAuthStateChanged(authUser => {
        if (authUser) {
          // User is signed in - update state using existing dispatch
          dispatch({
            type: "SET_USER",
            user: authUser
          });
        } else {
          // User is signed out - clear state
          dispatch({
            type: "SET_USER",
            user: null
          });
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    }, [dispatch]);

    const handleSignOut = () => {
      auth.signOut().then(() => {
        navigate('/');
      }).catch(error => {
        console.error('Sign out error:', error);
      });
    };

    const handleSignIn = () => {
      navigate(redirectTo);
    };

    // Show loading while checking auth state
    if (isLoading) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px',
          padding: '40px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #ff9900',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '16px'
          }}></div>
          <p style={{ color: '#232f3e', fontWeight: 'bold' }}>
            Checking authentication...
          </p>
        </div>
      );
    }

    // If authentication is required but user is not authenticated
    if (requireAuth && !user) {
      return (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '8px',
          margin: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            alt="Amazon"
            style={{
              height: '40px',
              marginBottom: '24px'
            }}
          />
          <h2 style={{ 
            color: '#232f3e', 
            marginBottom: '16px',
            fontSize: '24px'
          }}>
            Sign in required
          </h2>
          <p style={{ 
            color: '#565959', 
            marginBottom: '24px',
            fontSize: '16px',
            lineHeight: '1.5'
          }}>
            You need to sign in to access this feature. Sign in to see your personalized content.
          </p>
          
          {showLoginButton && (
            <button
              onClick={handleSignIn}
              style={{
                backgroundColor: '#ff9900',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginRight: '12px',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#e88b00'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ff9900'}
            >
              Sign In
            </button>
          )}
          
          <button
            onClick={() => navigate('/')}
            style={{
              backgroundColor: 'transparent',
              color: '#0066c0',
              border: '1px solid #0066c0',
              borderRadius: '4px',
              padding: '12px 24px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#0066c0';
              e.target.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#0066c0';
            }}
          >
            Continue as Guest
          </button>
        </div>
      );
    }

    // Pass through all props plus auth-related functionality
    return (
      <WrappedComponent
        {...props}
        user={user}
        isAuthenticated={!!user}
        onSignOut={handleSignOut}
        onSignIn={handleSignIn}
      />
    );
  };

  AuthenticatedComponent.displayName = `withAmazonAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  return AuthenticatedComponent;
};

/**
 * HOC Factory functions for common auth patterns
 */
export const withRequiredAuth = (WrappedComponent) => 
  withAmazonAuth(WrappedComponent, { requireAuth: true });

export const withOptionalAuth = (WrappedComponent) => 
  withAmazonAuth(WrappedComponent, { requireAuth: false });

export const withCheckoutAuth = (WrappedComponent) => 
  withAmazonAuth(WrappedComponent, { 
    requireAuth: true, 
    redirectTo: '/login',
    showLoginButton: true 
  });

export default withAmazonAuth;