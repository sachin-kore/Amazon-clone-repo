import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Enhanced Product Component using existing patterns and new HOCs
 * Reuses the styling and structure from the original Product component
 */
const EnhancedProduct = ({ 
  id, 
  title, 
  image, 
  price, 
  rating, 
  description,
  addToBasket,
  removeFromBasket,
  isInBasket,
  itemCount,
  amazonUI,
  amazonColors
}) => {
  const { AmazonButton, AmazonPrice, AmazonRating, AmazonCard, AmazonBadge } = amazonUI || {};

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      minHeight: '400px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }}>
      
      {/* Product Image */}
      <div style={{ textAlign: 'center', marginBottom: '12px', flex: '1' }}>
        <img 
          src={image} 
          alt={title}
          style={{
            maxWidth: '100%',
            maxHeight: '200px',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Product Info */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: amazonColors?.text || '#0f1111',
          marginBottom: '8px',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {title}
        </h3>

        {description && (
          <p style={{
            fontSize: '14px',
            color: amazonColors?.textSecondary || '#565959',
            marginBottom: '8px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {description}
          </p>
        )}

        {/* Rating */}
        {AmazonRating ? (
          <AmazonRating rating={rating} showText size="small" />
        ) : (
          <div style={{ marginBottom: '8px' }}>
            {Array(rating).fill().map((_, i) => (
              <span key={i} style={{ color: '#ff9900', fontSize: '14px' }}>★</span>
            ))}
          </div>
        )}

        {/* Price */}
        <div style={{ marginTop: 'auto', marginBottom: '12px' }}>
          {AmazonPrice ? (
            <AmazonPrice price={price} size="medium" />
          ) : (
            <div style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#B12704'
            }}>
              ${price}
            </div>
          )}
        </div>

        {/* Basket Status */}
        {isInBasket && itemCount > 0 && AmazonBadge && (
          <div style={{ marginBottom: '8px' }}>
            <AmazonBadge variant="green">
              {itemCount} in basket
            </AmazonBadge>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          {AmazonButton ? (
            <>
              <AmazonButton 
                onClick={addToBasket}
                variant="primary"
                size="medium"
                style={{ flex: 1 }}
              >
                Add to Basket
              </AmazonButton>
              {isInBasket && (
                <AmazonButton 
                  onClick={removeFromBasket}
                  variant="secondary"
                  size="medium"
                >
                  Remove
                </AmazonButton>
              )}
            </>
          ) : (
            <button 
              onClick={addToBasket}
              style={{
                backgroundColor: '#ff9900',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Add to Basket
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Enhanced Checkout Product Component
 */
const EnhancedCheckoutProduct = ({ 
  id, 
  title, 
  image, 
  price, 
  rating,
  removeFromBasket,
  updateQuantity,
  itemCount = 1,
  amazonUI,
  amazonColors
}) => {
  const { AmazonButton, AmazonPrice, AmazonRating, AmazonCard } = amazonUI || {};

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromBasket(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div style={{
      display: 'flex',
      padding: '16px',
      borderBottom: '1px solid #e7e7e7',
      backgroundColor: '#fff',
      marginBottom: '8px'
    }}>
      {/* Product Image */}
      <div style={{ marginRight: '16px', flexShrink: 0 }}>
        <img 
          src={image} 
          alt={title}
          style={{
            width: '120px',
            height: '120px',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Product Details */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: amazonColors?.text || '#0f1111',
          marginBottom: '8px'
        }}>
          {title}
        </h3>

        {/* Rating */}
        {AmazonRating ? (
          <AmazonRating rating={rating} showText size="small" />
        ) : (
          <div style={{ marginBottom: '8px' }}>
            {Array(rating).fill().map((_, i) => (
              <span key={i} style={{ color: '#ff9900', fontSize: '14px' }}>★</span>
            ))}
          </div>
        )}

        {/* Price */}
        <div style={{ marginBottom: '12px' }}>
          {AmazonPrice ? (
            <AmazonPrice price={price} size="medium" />
          ) : (
            <div style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#B12704'
            }}>
              ${price}
            </div>
          )}
        </div>

        {/* Quantity Controls */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          marginBottom: '12px'
        }}>
          <span style={{ fontSize: '14px', color: amazonColors?.textSecondary || '#565959' }}>
            Qty:
          </span>
          <select
            value={itemCount}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            style={{
              padding: '4px 8px',
              border: '1px solid #d5d9d9',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
          {AmazonButton ? (
            <AmazonButton 
              onClick={() => removeFromBasket(id)}
              variant="link"
              size="small"
            >
              Delete
            </AmazonButton>
          ) : (
            <button 
              onClick={() => removeFromBasket(id)}
              style={{
                backgroundColor: 'transparent',
                color: '#0066c0',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '14px'
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Enhanced Basket Summary Component
 */
const EnhancedBasketSummary = ({ 
  basketOperations,
  user,
  onCheckout,
  amazonUI,
  amazonColors
}) => {
  const navigate = useNavigate();
  const { AmazonButton, AmazonCard, AmazonPrice } = amazonUI || {};
  
  if (!basketOperations) return null;
  
  const summary = basketOperations.getBasketSummary();

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      navigate('/payment');
    }
  };

  if (summary.isEmpty) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}>
        <h3 style={{ color: amazonColors?.textSecondary || '#565959' }}>
          Your basket is empty
        </h3>
        <p style={{ color: amazonColors?.textSecondary || '#565959' }}>
          Add some products to get started!
        </p>
        {AmazonButton ? (
          <AmazonButton onClick={() => navigate('/')} variant="primary">
            Continue Shopping
          </AmazonButton>
        ) : (
          <button onClick={() => navigate('/')}>Continue Shopping</button>
        )}
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px'
    }}>
      <h3 style={{ 
        color: amazonColors?.text || '#0f1111',
        marginBottom: '16px',
        fontSize: '18px'
      }}>
        Order Summary
      </h3>

      <div style={{ marginBottom: '16px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <span>Items ({summary.totalItems}):</span>
          <span>{summary.formattedTotal}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <span>Shipping:</span>
          <span>FREE</span>
        </div>
        <hr style={{ margin: '12px 0', border: '1px solid #e7e7e7' }} />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: 'bold',
          fontSize: '18px'
        }}>
          <span>Total:</span>
          <span style={{ color: '#B12704' }}>{summary.formattedTotal}</span>
        </div>
      </div>

      {user && (
        <p style={{ 
          fontSize: '12px', 
          color: amazonColors?.textSecondary || '#565959',
          marginBottom: '16px'
        }}>
          Hello, {user.email}
        </p>
      )}

      {AmazonButton ? (
        <AmazonButton 
          onClick={handleCheckout}
          variant="primary"
          size="large"
          style={{ width: '100%' }}
        >
          Proceed to Checkout
        </AmazonButton>
      ) : (
        <button 
          onClick={handleCheckout}
          style={{
            width: '100%',
            backgroundColor: '#ff9900',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

/**
 * Enhanced User Profile Component
 */
const EnhancedUserProfile = ({ 
  user, 
  onSignOut,
  basketOperations,
  amazonUI,
  amazonColors
}) => {
  const { AmazonButton, AmazonCard, AmazonSection, AmazonBadge } = amazonUI || {};
  
  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  const basketSummary = basketOperations?.getBasketSummary();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {AmazonSection ? (
        <AmazonSection title="Your Account">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {/* User Info Card */}
            {AmazonCard ? (
              <AmazonCard title="Account Details">
                <div style={{ marginBottom: '12px' }}>
                  <strong>Email:</strong> {user.email}
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>User ID:</strong> {user.uid}
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Account Created:</strong> {
                    user.metadata?.creationTime ? 
                    new Date(user.metadata.creationTime).toLocaleDateString() : 
                    'N/A'
                  }
                </div>
                {AmazonButton && (
                  <AmazonButton onClick={onSignOut} variant="secondary">
                    Sign Out
                  </AmazonButton>
                )}
              </AmazonCard>
            ) : (
              <div>
                <h3>Account Details</h3>
                <p>Email: {user.email}</p>
                <button onClick={onSignOut}>Sign Out</button>
              </div>
            )}

            {/* Basket Summary Card */}
            {basketSummary && AmazonCard && (
              <AmazonCard title="Your Basket">
                <div style={{ marginBottom: '12px' }}>
                  <strong>Items in basket:</strong> {basketSummary.totalItems}
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Total value:</strong> {basketSummary.formattedTotal}
                </div>
                {basketSummary.totalItems > 0 && AmazonBadge && (
                  <AmazonBadge variant="green">
                    Ready to checkout
                  </AmazonBadge>
                )}
              </AmazonCard>
            )}
          </div>
        </AmazonSection>
      ) : (
        <div>
          <h2>Your Account</h2>
          <p>Email: {user.email}</p>
          <button onClick={onSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export {
  EnhancedProduct,
  EnhancedCheckoutProduct,
  EnhancedBasketSummary,
  EnhancedUserProfile
};