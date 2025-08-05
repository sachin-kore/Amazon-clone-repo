import React from 'react';

/**
 * HOC that provides Amazon-style UI components and styling
 * Reuses the design patterns from the existing project
 */
const withAmazonUI = (WrappedComponent) => {
  const AmazonUIEnhancedComponent = (props) => {
    
    // Amazon-style Button Component
    const AmazonButton = ({ 
      children, 
      variant = 'primary', 
      size = 'medium',
      onClick,
      disabled = false,
      style = {},
      ...buttonProps 
    }) => {
      const getButtonStyles = () => {
        const baseStyles = {
          border: 'none',
          borderRadius: '4px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
          fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
          padding: size === 'small' ? '6px 12px' : size === 'large' ? '12px 24px' : '8px 16px',
          opacity: disabled ? 0.6 : 1,
          ...style
        };

        const variants = {
          primary: {
            backgroundColor: '#ff9900',
            color: '#fff',
            '&:hover': { backgroundColor: '#e88b00' }
          },
          secondary: {
            backgroundColor: '#f0f2f2',
            color: '#0f1111',
            border: '1px solid #d5d9d9',
            '&:hover': { backgroundColor: '#e3e6e6' }
          },
          danger: {
            backgroundColor: '#d13212',
            color: '#fff',
            '&:hover': { backgroundColor: '#b12704' }
          },
          link: {
            backgroundColor: 'transparent',
            color: '#0066c0',
            textDecoration: 'underline',
            '&:hover': { color: '#005299' }
          }
        };

        return { ...baseStyles, ...variants[variant] };
      };

      return (
        <button
          onClick={onClick}
          disabled={disabled}
          style={getButtonStyles()}
          {...buttonProps}
          onMouseOver={(e) => {
            if (!disabled) {
              const variants = {
                primary: '#e88b00',
                secondary: '#e3e6e6',
                danger: '#b12704',
                link: '#005299'
              };
              e.target.style.backgroundColor = variants[variant] || variants.primary;
            }
          }}
          onMouseOut={(e) => {
            if (!disabled) {
              const variants = {
                primary: '#ff9900',
                secondary: '#f0f2f2',
                danger: '#d13212',
                link: 'transparent'
              };
              e.target.style.backgroundColor = variants[variant] || variants.primary;
            }
          }}
        >
          {children}
        </button>
      );
    };

    // Amazon-style Card Component
    const AmazonCard = ({ children, title, padding = '16px', style = {} }) => (
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #d5d9d9',
        borderRadius: '8px',
        padding: padding,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '16px',
        ...style
      }}>
        {title && (
          <h3 style={{
            color: '#0f1111',
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '12px',
            marginTop: '0'
          }}>
            {title}
          </h3>
        )}
        {children}
      </div>
    );

    // Amazon-style Price Component
    const AmazonPrice = ({ price, originalPrice, currency = '$', size = 'medium' }) => {
      const fontSize = size === 'small' ? '14px' : size === 'large' ? '24px' : '18px';
      
      return (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{
            color: '#B12704',
            fontSize: fontSize,
            fontWeight: 'bold'
          }}>
            {currency}{price}
          </span>
          {originalPrice && originalPrice > price && (
            <span style={{
              color: '#565959',
              fontSize: size === 'large' ? '16px' : '12px',
              textDecoration: 'line-through'
            }}>
              {currency}{originalPrice}
            </span>
          )}
        </div>
      );
    };

    // Amazon-style Rating Component
    const AmazonRating = ({ rating, maxRating = 5, showText = false, size = 'medium' }) => {
      const starSize = size === 'small' ? '12px' : size === 'large' ? '20px' : '16px';
      
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ display: 'flex' }}>
            {Array(maxRating).fill().map((_, i) => (
              <span 
                key={i} 
                style={{ 
                  fontSize: starSize,
                  color: i < rating ? '#ff9900' : '#ddd'
                }}
              >
                ★
              </span>
            ))}
          </div>
          {showText && (
            <span style={{ 
              color: '#0066c0', 
              fontSize: '12px',
              marginLeft: '4px'
            }}>
              ({rating})
            </span>
          )}
        </div>
      );
    };

    // Amazon-style Input Component
    const AmazonInput = ({ 
      type = 'text', 
      placeholder, 
      value, 
      onChange, 
      style = {},
      error = false,
      ...inputProps 
    }) => (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: `1px solid ${error ? '#d13212' : '#d5d9d9'}`,
          borderRadius: '4px',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.3s',
          '&:focus': {
            borderColor: error ? '#d13212' : '#ff9900',
            boxShadow: `0 0 0 2px ${error ? 'rgba(209, 50, 18, 0.2)' : 'rgba(255, 153, 0, 0.2)'}`
          },
          ...style
        }}
        {...inputProps}
      />
    );

    // Amazon-style Badge Component
    const AmazonBadge = ({ children, variant = 'orange', size = 'small' }) => {
      const variants = {
        orange: { backgroundColor: '#ff9900', color: '#fff' },
        red: { backgroundColor: '#d13212', color: '#fff' },
        blue: { backgroundColor: '#0066c0', color: '#fff' },
        green: { backgroundColor: '#067d62', color: '#fff' },
        gray: { backgroundColor: '#565959', color: '#fff' }
      };

      return (
        <span style={{
          ...variants[variant],
          padding: size === 'small' ? '2px 6px' : '4px 8px',
          borderRadius: '4px',
          fontSize: size === 'small' ? '10px' : '12px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {children}
        </span>
      );
    };

    // Amazon-style Loading Spinner
    const AmazonSpinner = ({ size = 'medium', color = '#ff9900' }) => {
      const dimensions = size === 'small' ? '20px' : size === 'large' ? '60px' : '40px';
      
      return (
        <div style={{
          width: dimensions,
          height: dimensions,
          border: `3px solid #f3f3f3`,
          borderTop: `3px solid ${color}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      );
    };

    // Amazon-style Header Section
    const AmazonSection = ({ title, children, style = {} }) => (
      <section style={{
        marginBottom: '24px',
        ...style
      }}>
        {title && (
          <h2 style={{
            color: '#0f1111',
            fontSize: '21px',
            fontWeight: 'bold',
            marginBottom: '16px',
            borderBottom: '1px solid #e7e7e7',
            paddingBottom: '8px'
          }}>
            {title}
          </h2>
        )}
        {children}
      </section>
    );

    // Amazon UI components object
    const amazonUI = {
      AmazonButton,
      AmazonCard,
      AmazonPrice,
      AmazonRating,
      AmazonInput,
      AmazonBadge,
      AmazonSpinner,
      AmazonSection
    };

    // Amazon color palette
    const amazonColors = {
      primary: '#ff9900',
      primaryHover: '#e88b00',
      text: '#0f1111',
      textSecondary: '#565959',
      link: '#0066c0',
      linkHover: '#005299',
      danger: '#d13212',
      success: '#067d62',
      border: '#d5d9d9',
      background: '#fafafa',
      white: '#ffffff'
    };

    return (
      <WrappedComponent
        {...props}
        amazonUI={amazonUI}
        amazonColors={amazonColors}
      />
    );
  };

  AmazonUIEnhancedComponent.displayName = `withAmazonUI(${WrappedComponent.displayName || WrappedComponent.name})`;

  return AmazonUIEnhancedComponent;
};

/**
 * Standalone Amazon UI Components that can be used without HOC
 */
export const AmazonButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick,
  disabled = false,
  style = {},
  ...props 
}) => {
  const baseStyles = {
    border: 'none',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
    padding: size === 'small' ? '6px 12px' : size === 'large' ? '12px 24px' : '8px 16px',
    opacity: disabled ? 0.6 : 1,
    ...style
  };

  const variants = {
    primary: { backgroundColor: '#ff9900', color: '#fff' },
    secondary: { backgroundColor: '#f0f2f2', color: '#0f1111', border: '1px solid #d5d9d9' },
    danger: { backgroundColor: '#d13212', color: '#fff' }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyles, ...variants[variant] }}
      {...props}
    >
      {children}
    </button>
  );
};

export const AmazonCard = ({ children, title, style = {} }) => (
  <div style={{
    backgroundColor: '#fff',
    border: '1px solid #d5d9d9',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '16px',
    ...style
  }}>
    {title && <h3 style={{ marginTop: 0, color: '#0f1111' }}>{title}</h3>}
    {children}
  </div>
);

export default withAmazonUI;