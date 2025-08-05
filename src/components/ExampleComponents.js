import React, { useState } from 'react';

/**
 * Basic User Profile Component
 * This will be wrapped with various HOCs to demonstrate their usage
 */
const UserProfile = ({ user, logout, data, refetch }) => {
  return (
    <div style={{
      padding: '24px',
      border: '1px solid #e1e5e9',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      margin: '20px',
      maxWidth: '600px'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: 0, color: '#2c3e50' }}>User Profile</h2>
        {logout && (
          <button
            onClick={logout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        )}
      </div>

      {user && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '12px' }}>
            Welcome, {user.name}!
          </h3>
          <p style={{ color: '#7f8c8d', margin: '4px 0' }}>
            <strong>Email:</strong> {user.email}
          </p>
          <p style={{ color: '#7f8c8d', margin: '4px 0' }}>
            <strong>ID:</strong> {user.id}
          </p>
        </div>
      )}

      {data && (
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <h4 style={{ margin: 0, color: '#2c3e50' }}>API Data</h4>
            {refetch && (
              <button
                onClick={refetch}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Refresh
              </button>
            )}
          </div>
          <pre style={{
            backgroundColor: '#f8f9fa',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '12px',
            overflow: 'auto',
            maxHeight: '200px'
          }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

/**
 * Simple User List Component
 */
const UserList = ({ data, refetch }) => {
  return (
    <div style={{
      padding: '24px',
      border: '1px solid #e1e5e9',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      margin: '20px',
      maxWidth: '800px'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: 0, color: '#2c3e50' }}>Users Directory</h2>
        {refetch && (
          <button
            onClick={refetch}
            style={{
              padding: '8px 16px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Data
          </button>
        )}
      </div>

      {data && data.length > 0 ? (
        <div style={{ display: 'grid', gap: '12px' }}>
          {data.map(user => (
            <div
              key={user.id}
              style={{
                padding: '16px',
                border: '1px solid #dee2e6',
                borderRadius: '6px',
                backgroundColor: '#f8f9fa'
              }}
            >
              <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>
                {user.name}
              </h4>
              <p style={{ margin: '4px 0', color: '#6c757d', fontSize: '14px' }}>
                📧 {user.email}
              </p>
              {user.company && (
                <p style={{ margin: '4px 0', color: '#6c757d', fontSize: '14px' }}>
                  🏢 {user.company}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#6c757d', textAlign: 'center', padding: '40px' }}>
          No users found
        </p>
      )}
    </div>
  );
};

/**
 * Component that demonstrates error throwing
 */
const BuggyComponent = ({ shouldThrow = false }) => {
  const [throwError, setThrowError] = useState(shouldThrow);

  if (throwError) {
    throw new Error('This is a deliberate error for testing Error Boundary HOC!');
  }

  return (
    <div style={{
      padding: '24px',
      border: '1px solid #28a745',
      borderRadius: '8px',
      backgroundColor: '#d4edda',
      margin: '20px',
      textAlign: 'center'
    }}>
      <h3 style={{ color: '#155724', marginBottom: '16px' }}>
        ✅ Component Working Fine
      </h3>
      <p style={{ color: '#155724', marginBottom: '16px' }}>
        This component is working normally. Click the button below to simulate an error.
      </p>
      <button
        onClick={() => setThrowError(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Throw Error (Test Error Boundary)
      </button>
    </div>
  );
};

/**
 * Component with loading simulation
 */
const LoadingDemo = ({ isLoading, onToggleLoading }) => {
  return (
    <div style={{
      padding: '24px',
      border: '1px solid #17a2b8',
      borderRadius: '8px',
      backgroundColor: '#d1ecf1',
      margin: '20px',
      textAlign: 'center'
    }}>
      <h3 style={{ color: '#0c5460', marginBottom: '16px' }}>
        Loading State Demo
      </h3>
      <p style={{ color: '#0c5460', marginBottom: '16px' }}>
        Current loading state: {isLoading ? 'Loading...' : 'Loaded'}
      </p>
      <button
        onClick={onToggleLoading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#17a2b8',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Toggle Loading State
      </button>
    </div>
  );
};

/**
 * Simple Posts Component
 */
const PostsList = ({ data, userId, refetch }) => {
  return (
    <div style={{
      padding: '24px',
      border: '1px solid #e1e5e9',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      margin: '20px',
      maxWidth: '800px'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: 0, color: '#2c3e50' }}>
          Posts {userId ? `for User ${userId}` : ''}
        </h2>
        {refetch && (
          <button
            onClick={refetch}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f39c12',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Posts
          </button>
        )}
      </div>

      {data && data.length > 0 ? (
        <div style={{ display: 'grid', gap: '16px' }}>
          {data.map(post => (
            <div
              key={post.id}
              style={{
                padding: '16px',
                border: '1px solid #dee2e6',
                borderRadius: '6px',
                backgroundColor: '#f8f9fa'
              }}
            >
              <h4 style={{ 
                margin: '0 0 8px 0', 
                color: '#2c3e50',
                fontSize: '16px',
                textTransform: 'capitalize'
              }}>
                {post.title}
              </h4>
              <p style={{ 
                margin: 0, 
                color: '#6c757d', 
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                {post.body}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#6c757d', textAlign: 'center', padding: '40px' }}>
          No posts found
        </p>
      )}
    </div>
  );
};

export {
  UserProfile,
  UserList,
  BuggyComponent,
  LoadingDemo,
  PostsList
};