import React, { useState } from 'react';

// Import HOCs
import withAuth from './hocs/withAuth';
import withLoading from './hocs/withLoading';
import withErrorBoundary, { DefaultErrorFallback } from './hocs/withErrorBoundary';
import { withUsersData, withPostsData, withUserDetails } from './hocs/withApiData';

// Import example components
import { 
  UserProfile, 
  UserList, 
  BuggyComponent, 
  LoadingDemo,
  PostsList 
} from './components/ExampleComponents';

/**
 * HOC Examples and Demonstrations
 */
const HOCExample = () => {
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);

  // 1. Basic Authentication HOC
  const AuthenticatedUserProfile = withAuth(UserProfile);

  // 2. Loading HOC
  const LoadingUserProfile = withLoading(LoadingDemo);

  // 3. Error Boundary HOC
  const SafeBuggyComponent = withErrorBoundary(BuggyComponent, DefaultErrorFallback);

  // 4. API Data HOCs
  const UsersWithData = withUsersData(UserList);
  const PostsWithData = withPostsData(PostsList);
  const UserDetailsWithData = withUserDetails(UserProfile);

  // 5. Composed HOCs (Multiple HOCs on one component)
  const FullyProtectedUserProfile = withAuth(
    withErrorBoundary(
      withLoading(UserProfile)
    )
  );

  const ProtectedUsersWithData = withAuth(
    withErrorBoundary(
      withUsersData(UserList)
    )
  );

  const handleToggleLoading = () => {
    setIsLoadingDemo(prev => !prev);
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        padding: '40px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          color: '#2c3e50', 
          marginBottom: '16px',
          fontSize: '2.5rem'
        }}>
          React Higher-Order Components (HOCs) Demo
        </h1>
        <p style={{ 
          color: '#7f8c8d', 
          fontSize: '1.2rem',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          This page demonstrates various Higher-Order Components patterns including 
          authentication, loading states, error boundaries, API data fetching, and HOC composition.
        </p>
      </div>

      {/* Navigation */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '40px'
      }}>
        {[
          { title: '🔐 Authentication HOC', color: '#e74c3c' },
          { title: '⏳ Loading HOC', color: '#3498db' },
          { title: '🛡️ Error Boundary HOC', color: '#e67e22' },
          { title: '🌐 API Data HOC', color: '#27ae60' },
          { title: '🔗 Composed HOCs', color: '#9b59b6' }
        ].map((item, index) => (
          <div
            key={index}
            style={{
              padding: '16px',
              backgroundColor: item.color,
              color: 'white',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => {
              const element = document.getElementById(`section-${index}`);
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {item.title}
          </div>
        ))}
      </div>

      {/* Section 1: Authentication HOC */}
      <section id="section-0" style={{ marginBottom: '60px' }}>
        <h2 style={{ 
          color: '#2c3e50', 
          marginBottom: '20px',
          borderBottom: '3px solid #e74c3c',
          paddingBottom: '10px'
        }}>
          🔐 Authentication HOC Example
        </h2>
        <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>
          The `withAuth` HOC protects components by checking authentication status. 
          If not authenticated, it shows a login form. Once authenticated, it passes 
          user data and auth functions to the wrapped component.
        </p>
        
        <div style={{ 
          backgroundColor: '#2c3e50', 
          color: '#ecf0f1', 
          padding: '16px', 
          borderRadius: '6px',
          marginBottom: '20px',
          fontSize: '14px',
          fontFamily: 'monospace'
        }}>
          <strong>Usage:</strong><br />
          {`const AuthenticatedComponent = withAuth(YourComponent);`}
        </div>

        <AuthenticatedUserProfile />
      </section>

      {/* Section 2: Loading HOC */}
      <section id="section-1" style={{ marginBottom: '60px' }}>
        <h2 style={{ 
          color: '#2c3e50', 
          marginBottom: '20px',
          borderBottom: '3px solid #3498db',
          paddingBottom: '10px'
        }}>
          ⏳ Loading HOC Example
        </h2>
        <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>
          The `withLoading` HOC adds loading state management to any component. 
          It shows a spinner when `isLoading` prop is true, otherwise renders the wrapped component.
        </p>
        
        <div style={{ 
          backgroundColor: '#2c3e50', 
          color: '#ecf0f1', 
          padding: '16px', 
          borderRadius: '6px',
          marginBottom: '20px',
          fontSize: '14px',
          fontFamily: 'monospace'
        }}>
          <strong>Usage:</strong><br />
          {`const LoadingComponent = withLoading(YourComponent);
<LoadingComponent isLoading={true} loadingMessage="Please wait..." />`}
        </div>

        <LoadingUserProfile 
          isLoading={isLoadingDemo}
          loadingMessage="Loading demo content..."
          onToggleLoading={handleToggleLoading}
        />
      </section>

      {/* Section 3: Error Boundary HOC */}
      <section id="section-2" style={{ marginBottom: '60px' }}>
        <h2 style={{ 
          color: '#2c3e50', 
          marginBottom: '20px',
          borderBottom: '3px solid #e67e22',
          paddingBottom: '10px'
        }}>
          🛡️ Error Boundary HOC Example
        </h2>
        <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>
          The `withErrorBoundary` HOC catches JavaScript errors in the component tree 
          and displays a fallback UI instead of crashing the entire app.
        </p>
        
        <div style={{ 
          backgroundColor: '#2c3e50', 
          color: '#ecf0f1', 
          padding: '16px', 
          borderRadius: '6px',
          marginBottom: '20px',
          fontSize: '14px',
          fontFamily: 'monospace'
        }}>
          <strong>Usage:</strong><br />
          {`const SafeComponent = withErrorBoundary(YourComponent, CustomErrorFallback);`}
        </div>

        <SafeBuggyComponent />
      </section>

      {/* Section 4: API Data HOC */}
      <section id="section-3" style={{ marginBottom: '60px' }}>
        <h2 style={{ 
          color: '#2c3e50', 
          marginBottom: '20px',
          borderBottom: '3px solid #27ae60',
          paddingBottom: '10px'
        }}>
          🌐 API Data HOC Examples
        </h2>
        <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>
          The `withApiData` HOC handles data fetching, loading states, and error handling. 
          It can be configured for different APIs and automatically provides data, loading, 
          error states, and refetch functionality to wrapped components.
        </p>
        
        <div style={{ 
          backgroundColor: '#2c3e50', 
          color: '#ecf0f1', 
          padding: '16px', 
          borderRadius: '6px',
          marginBottom: '20px',
          fontSize: '14px',
          fontFamily: 'monospace'
        }}>
          <strong>Usage:</strong><br />
          {`const UsersWithData = withUsersData(UserListComponent);
const PostsWithData = withPostsData(PostsComponent);
const UserDetails = withUserDetails(UserComponent);`}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#27ae60', marginBottom: '10px' }}>Users API Data</h3>
          <UsersWithData />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#27ae60', marginBottom: '10px' }}>Posts API Data</h3>
          <PostsWithData />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#27ae60', marginBottom: '10px' }}>User Details (User ID: 1)</h3>
          <UserDetailsWithData userId={1} />
        </div>
      </section>

      {/* Section 5: Composed HOCs */}
      <section id="section-4" style={{ marginBottom: '60px' }}>
        <h2 style={{ 
          color: '#2c3e50', 
          marginBottom: '20px',
          borderBottom: '3px solid #9b59b6',
          paddingBottom: '10px'
        }}>
          🔗 Composed HOCs Examples
        </h2>
        <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>
          HOCs can be composed together to combine multiple functionalities. 
          This demonstrates authentication + error boundary + loading, and 
          authentication + error boundary + API data fetching.
        </p>
        
        <div style={{ 
          backgroundColor: '#2c3e50', 
          color: '#ecf0f1', 
          padding: '16px', 
          borderRadius: '6px',
          marginBottom: '20px',
          fontSize: '14px',
          fontFamily: 'monospace'
        }}>
          <strong>Usage:</strong><br />
          {`const FullyProtectedComponent = withAuth(
  withErrorBoundary(
    withLoading(YourComponent)
  )
);`}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#9b59b6', marginBottom: '10px' }}>
            Auth + Error Boundary + Loading
          </h3>
          <FullyProtectedUserProfile 
            isLoading={false}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#9b59b6', marginBottom: '10px' }}>
            Auth + Error Boundary + API Data
          </h3>
          <ProtectedUsersWithData />
        </div>
      </section>

      {/* Documentation Section */}
      <section style={{ 
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '40px'
      }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>
          📚 HOC Best Practices
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div>
            <h4 style={{ color: '#e74c3c', marginBottom: '10px' }}>✅ Do's</h4>
            <ul style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              <li>Use HOCs for cross-cutting concerns</li>
              <li>Set proper display names for debugging</li>
              <li>Pass through all props with spread operator</li>
              <li>Use composition for multiple HOCs</li>
              <li>Keep HOCs pure and predictable</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#e67e22', marginBottom: '10px' }}>❌ Don'ts</h4>
            <ul style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              <li>Don't use HOCs inside render methods</li>
              <li>Don't mutate the original component</li>
              <li>Don't copy static methods manually</li>
              <li>Don't use HOCs for simple prop passing</li>
              <li>Don't overuse HOCs for everything</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '20px',
        color: '#7f8c8d',
        borderTop: '1px solid #dee2e6'
      }}>
        <p>
          Higher-Order Components provide a powerful pattern for reusing component logic. 
          Consider using React Hooks for simpler use cases in modern React applications.
        </p>
      </footer>
    </div>
  );
};

export default HOCExample;