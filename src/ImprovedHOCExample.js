import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import improved HOCs that reuse project logic
import withAmazonAuth, { withRequiredAuth, withOptionalAuth, withCheckoutAuth } from './hocs/withAmazonAuth';
import withBasketOperations, { withProductActions, withCheckoutOperations } from './hocs/withBasketOperations';
import withAmazonUI from './hocs/withAmazonUI';
import withErrorBoundary from './hocs/withErrorBoundary';
import withLoading from './hocs/withLoading';

// Import enhanced components
import { 
  EnhancedProduct, 
  EnhancedCheckoutProduct, 
  EnhancedBasketSummary,
  EnhancedUserProfile 
} from './components/EnhancedComponents';

// Import existing project components to show integration
import { Product } from './Product';
import { CheckOutProduct } from './CheckOutProduct';
import Subtotal from './Subtotal';

/**
 * Improved HOC Examples using existing project logic and components
 */
const ImprovedHOCExample = () => {
  const navigate = useNavigate();
  const [loadingDemo, setLoadingDemo] = useState(false);

  // Sample product data that matches the existing project structure
  const sampleProducts = [
    {
      id: 'hoc-1',
      title: 'iPhone 14 Pro - Enhanced with HOCs',
      image: 'https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_SL1500_.jpg',
      price: 999.99,
      rating: 5,
      description: 'Latest iPhone with advanced camera system and A16 Bionic chip'
    },
    {
      id: 'hoc-2',
      title: 'MacBook Air M2 - HOC Enhanced',
      image: 'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SL1500_.jpg',
      price: 1199.99,
      rating: 4,
      description: 'Ultra-thin laptop with M2 chip and all-day battery life'
    },
    {
      id: 'hoc-3',
      title: 'AirPods Pro 2nd Gen - With HOC Features',
      image: 'https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg',
      price: 249.99,
      rating: 5,
      description: 'Active Noise Cancellation and Spatial Audio'
    }
  ];

  // Create enhanced components using HOC composition
  
  // 1. Product component with all enhancements
  const FullyEnhancedProduct = withAmazonUI(
    withProductActions(
      withErrorBoundary(EnhancedProduct)
    )
  );

  // 2. Checkout product with basket operations
  const EnhancedCheckoutWithOperations = withAmazonUI(
    withCheckoutOperations(
      withErrorBoundary(EnhancedCheckoutProduct)
    )
  );

  // 3. Basket summary with authentication and UI
  const ProtectedBasketSummary = withRequiredAuth(
    withAmazonUI(
      withBasketOperations(
        withErrorBoundary(EnhancedBasketSummary)
      )
    )
  );

  // 4. User profile with all features
  const FullUserProfile = withRequiredAuth(
    withAmazonUI(
      withBasketOperations(
        withErrorBoundary(EnhancedUserProfile)
      )
    )
  );

  // 5. Original components enhanced with new HOCs
  const EnhancedOriginalProduct = withProductActions(
    withAmazonUI(Product)
  );

  const EnhancedOriginalCheckout = withCheckoutOperations(
    withAmazonUI(CheckOutProduct)
  );

  const EnhancedSubtotal = withAmazonUI(
    withBasketOperations(Subtotal)
  );

  // 6. Loading demo component
  const LoadingDemoComponent = ({ isLoading, onToggle, amazonUI }) => {
    const { AmazonButton, AmazonCard, AmazonSpinner } = amazonUI || {};

    if (isLoading) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <AmazonSpinner size="large" />
          <p style={{ marginTop: '16px', color: '#565959' }}>
            Loading enhanced components...
          </p>
        </div>
      );
    }

    return AmazonCard ? (
      <AmazonCard title="Loading State Demo">
        <p style={{ marginBottom: '16px', color: '#565959' }}>
          This demonstrates loading states with Amazon-style UI components.
        </p>
        <AmazonButton onClick={onToggle} variant="primary">
          Simulate Loading
        </AmazonButton>
      </AmazonCard>
    ) : (
      <div style={{ padding: '20px', border: '1px solid #ddd' }}>
        <h3>Loading Demo</h3>
        <button onClick={onToggle}>Simulate Loading</button>
      </div>
    );
  };

  const LoadingDemo = withAmazonUI(
    withLoading(LoadingDemoComponent)
  );

  const handleLoadingToggle = () => {
    setLoadingDemo(true);
    setTimeout(() => setLoadingDemo(false), 2000);
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fafafa',
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
          color: '#232f3e', 
          marginBottom: '16px',
          fontSize: '2.5rem'
        }}>
          🚀 Improved React HOCs
        </h1>
        <p style={{ 
          color: '#565959', 
          fontSize: '1.2rem',
          maxWidth: '900px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Enhanced Higher-Order Components that reuse existing project logic, 
          integrate with Firebase authentication, Amazon state management, 
          and maintain the project's design patterns.
        </p>
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          marginTop: '20px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => navigate('/')}
            style={{
              backgroundColor: '#232f3e',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 20px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ← Back to Amazon Clone
          </button>
          <button
            onClick={() => navigate('/hoc-examples')}
            style={{
              backgroundColor: '#ff9900',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 20px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            View Basic HOC Examples
          </button>
        </div>
      </div>

      {/* Integration Overview */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{
          backgroundColor: '#ffffff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#232f3e', marginBottom: '20px' }}>
            🔗 Project Integration Benefits
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {[
              {
                title: '🔥 Firebase Integration',
                description: 'Uses existing Firebase auth configuration and user state management'
              },
              {
                title: '🛒 Basket Operations',
                description: 'Reuses existing reducer logic and StateProvider for consistent basket behavior'
              },
              {
                title: '🎨 Amazon UI Design',
                description: 'Maintains the Amazon design language and color scheme throughout'
              },
              {
                title: '🔄 Component Reuse',
                description: 'Enhances existing components without breaking current functionality'
              }
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '20px',
                  border: '1px solid #e7e7e7',
                  borderRadius: '8px',
                  backgroundColor: '#f8f9fa'
                }}
              >
                <h4 style={{ color: '#232f3e', marginBottom: '8px' }}>
                  {item.title}
                </h4>
                <p style={{ color: '#565959', fontSize: '14px', lineHeight: '1.5' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Products Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          color: '#232f3e', 
          marginBottom: '20px',
          borderBottom: '3px solid #ff9900',
          paddingBottom: '10px'
        }}>
          🛍️ Enhanced Product Components
        </h2>
        <p style={{ color: '#565959', marginBottom: '20px' }}>
          These products use the enhanced HOCs that integrate with your existing basket operations,
          Firebase authentication, and Amazon UI design system.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '20px'
        }}>
          {sampleProducts.map(product => (
            <FullyEnhancedProduct
              key={product.id}
              {...product}
            />
          ))}
        </div>
      </section>

      {/* Protected Basket Summary */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          color: '#232f3e', 
          marginBottom: '20px',
          borderBottom: '3px solid #067d62',
          paddingBottom: '10px'
        }}>
          🔐 Protected Basket Summary
        </h2>
        <p style={{ color: '#565959', marginBottom: '20px' }}>
          This component requires authentication and integrates with your existing basket state.
          It uses the same checkout flow as your original application.
        </p>
        <ProtectedBasketSummary />
      </section>

      {/* User Profile with Basket Integration */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          color: '#232f3e', 
          marginBottom: '20px',
          borderBottom: '3px solid #0066c0',
          paddingBottom: '10px'
        }}>
          👤 Enhanced User Profile
        </h2>
        <p style={{ color: '#565959', marginBottom: '20px' }}>
          User profile that shows real Firebase user data and integrates with basket operations.
        </p>
        <FullUserProfile />
      </section>

      {/* Enhanced Original Components */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          color: '#232f3e', 
          marginBottom: '20px',
          borderBottom: '3px solid #d13212',
          paddingBottom: '10px'
        }}>
          ♻️ Enhanced Original Components
        </h2>
        <p style={{ color: '#565959', marginBottom: '20px' }}>
          Your existing components enhanced with new HOCs while maintaining their original functionality.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '20px'
        }}>
          {/* Example using original Product component structure */}
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}>
            <h3 style={{ color: '#232f3e', marginBottom: '16px' }}>
              Original Product Component Enhanced
            </h3>
            <EnhancedOriginalProduct
              id="original-1"
              title="Echo Dot (4th Gen)"
              image="https://m.media-amazon.com/images/I/71dVlSDZ9DL._AC_SL1000_.jpg"
              price={49.99}
              rating={4}
            />
          </div>

          {/* Loading Demo */}
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}>
            <h3 style={{ color: '#232f3e', marginBottom: '16px' }}>
              Loading State Integration
            </h3>
            <LoadingDemo
              isLoading={loadingDemo}
              onToggle={handleLoadingToggle}
            />
          </div>
        </div>
      </section>

      {/* Technical Implementation */}
      <section style={{
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '40px'
      }}>
        <h2 style={{ color: '#232f3e', marginBottom: '20px' }}>
          ⚙️ Technical Implementation
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          <div>
            <h3 style={{ color: '#ff9900', marginBottom: '12px' }}>HOC Composition</h3>
            <pre style={{
              backgroundColor: '#f8f9fa',
              padding: '16px',
              borderRadius: '6px',
              fontSize: '12px',
              border: '1px solid #e7e7e7',
              overflow: 'auto'
            }}>
{`const FullyEnhancedProduct = 
  withAmazonUI(
    withProductActions(
      withErrorBoundary(
        EnhancedProduct
      )
    )
  );`}
            </pre>
          </div>

          <div>
            <h3 style={{ color: '#067d62', marginBottom: '12px' }}>State Integration</h3>
            <pre style={{
              backgroundColor: '#f8f9fa',
              padding: '16px',
              borderRadius: '6px',
              fontSize: '12px',
              border: '1px solid #e7e7e7',
              overflow: 'auto'
            }}>
{`// Uses existing StateProvider
const [{ basket, user }, dispatch] = 
  useStateValue();

// Reuses existing reducer actions
dispatch({
  type: "ADD_TO_BASKET",
  item: product
});`}
            </pre>
          </div>

          <div>
            <h3 style={{ color: '#0066c0', marginBottom: '12px' }}>Firebase Integration</h3>
            <pre style={{
              backgroundColor: '#f8f9fa',
              padding: '16px',
              borderRadius: '6px',
              fontSize: '12px',
              border: '1px solid #e7e7e7',
              overflow: 'auto'
            }}>
{`// Uses existing Firebase config
import { auth } from '../Firebase';

auth.onAuthStateChanged(user => {
  dispatch({
    type: "SET_USER", 
    user
  });
});`}
            </pre>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section style={{
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '40px'
      }}>
        <h2 style={{ color: '#232f3e', marginBottom: '20px' }}>
          📋 Code Reuse Best Practices Demonstrated
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {[
            {
              title: '🎯 Single Responsibility',
              description: 'Each HOC has a clear, focused purpose while integrating seamlessly'
            },
            {
              title: '🔄 Reusability',
              description: 'HOCs work with both new and existing components without modification'
            },
            {
              title: '🧩 Composition',
              description: 'Multiple HOCs can be combined for complex functionality'
            },
            {
              title: '🛡️ Backward Compatibility',
              description: 'Existing components continue to work while gaining new features'
            },
            {
              title: '📦 State Management',
              description: 'Leverages existing Redux-like state patterns and Firebase integration'
            },
            {
              title: '🎨 Design Consistency',
              description: 'Maintains Amazon design language across all enhanced components'
            }
          ].map((practice, index) => (
            <div
              key={index}
              style={{
                padding: '16px',
                border: '1px solid #e7e7e7',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa'
              }}
            >
              <h4 style={{ color: '#232f3e', marginBottom: '8px', fontSize: '14px' }}>
                {practice.title}
              </h4>
              <p style={{ color: '#565959', fontSize: '12px', lineHeight: '1.4', margin: 0 }}>
                {practice.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '30px',
        backgroundColor: '#232f3e',
        color: '#ffffff',
        borderRadius: '12px'
      }}>
        <h3 style={{ marginBottom: '16px' }}>🎉 Project Integration Complete</h3>
        <p style={{ marginBottom: '20px', opacity: 0.9 }}>
          These HOCs demonstrate how to improve code reuse while maintaining 
          existing functionality and design patterns. They integrate seamlessly 
          with your Firebase authentication, state management, and UI components.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              backgroundColor: '#ff9900',
              color: '#232f3e',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 20px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Return to Main App
          </button>
          <button
            onClick={() => navigate('/checkout')}
            style={{
              backgroundColor: 'transparent',
              color: '#ffffff',
              border: '2px solid #ffffff',
              borderRadius: '6px',
              padding: '8px 18px',
              cursor: 'pointer'
            }}
          >
            Test Checkout Flow
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ImprovedHOCExample;