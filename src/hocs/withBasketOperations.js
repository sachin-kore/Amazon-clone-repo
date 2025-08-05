import React from 'react';
import { useStateValue } from '../StateProvider';
import { getBasketTotal } from '../reducer';

/**
 * HOC that provides basket operations using existing state management
 * Reuses the reducer logic and state provider from the project
 */
const withBasketOperations = (WrappedComponent) => {
  const BasketEnhancedComponent = (props) => {
    const [{ basket, user }, dispatch] = useStateValue();

    // Add item to basket (reusing existing reducer logic)
    const addToBasket = (item) => {
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
          rating: item.rating,
          description: item.description
        }
      });
    };

    // Remove item from basket (reusing existing reducer logic)
    const removeFromBasket = (id) => {
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: id
      });
    };

    // Clear entire basket
    const clearBasket = () => {
      basket.forEach(item => {
        dispatch({
          type: "REMOVE_FROM_BASKET",
          id: item.id
        });
      });
    };

    // Check if item is in basket
    const isInBasket = (id) => {
      return basket.some(item => item.id === id);
    };

    // Get item count in basket
    const getItemCount = (id) => {
      return basket.filter(item => item.id === id).length;
    };

    // Get total items count
    const getTotalItems = () => {
      return basket.length;
    };

    // Get basket total (reusing existing function)
    const getTotal = () => {
      return getBasketTotal(basket);
    };

    // Get formatted total for display
    const getFormattedTotal = () => {
      const total = getTotal();
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(total);
    };

    // Get basket summary
    const getBasketSummary = () => {
      return {
        items: basket,
        totalItems: getTotalItems(),
        totalPrice: getTotal(),
        formattedTotal: getFormattedTotal(),
        isEmpty: basket.length === 0
      };
    };

    // Basket operations object
    const basketOperations = {
      addToBasket,
      removeFromBasket,
      clearBasket,
      isInBasket,
      getItemCount,
      getTotalItems,
      getTotal,
      getFormattedTotal,
      getBasketSummary
    };

    return (
      <WrappedComponent
        {...props}
        basket={basket}
        basketOperations={basketOperations}
        user={user}
      />
    );
  };

  BasketEnhancedComponent.displayName = `withBasketOperations(${WrappedComponent.displayName || WrappedComponent.name})`;

  return BasketEnhancedComponent;
};

/**
 * HOC specifically for product components that need add/remove functionality
 */
export const withProductActions = (WrappedComponent) => {
  const ProductActionsComponent = (props) => {
    const [{ basket }, dispatch] = useStateValue();
    const { id, title, image, price, rating } = props;

    const addToBasket = () => {
      dispatch({
        type: "ADD_TO_BASKET",
        item: { id, title, image, price, rating }
      });
    };

    const removeFromBasket = () => {
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: id
      });
    };

    const isInBasket = basket.some(item => item.id === id);
    const itemCount = basket.filter(item => item.id === id).length;

    return (
      <WrappedComponent
        {...props}
        addToBasket={addToBasket}
        removeFromBasket={removeFromBasket}
        isInBasket={isInBasket}
        itemCount={itemCount}
      />
    );
  };

  ProductActionsComponent.displayName = `withProductActions(${WrappedComponent.displayName || WrappedComponent.name})`;

  return ProductActionsComponent;
};

/**
 * HOC for checkout-related components
 */
export const withCheckoutOperations = (WrappedComponent) => {
  const CheckoutEnhancedComponent = (props) => {
    const [{ basket, user }, dispatch] = useStateValue();

    const removeFromBasket = (id) => {
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: id
      });
    };

    const updateQuantity = (id, newQuantity) => {
      const currentCount = basket.filter(item => item.id === id).length;
      const difference = newQuantity - currentCount;

      if (difference > 0) {
        // Add more items
        const item = basket.find(item => item.id === id);
        for (let i = 0; i < difference; i++) {
          dispatch({
            type: "ADD_TO_BASKET",
            item: item
          });
        }
      } else if (difference < 0) {
        // Remove items
        for (let i = 0; i < Math.abs(difference); i++) {
          dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id
          });
        }
      }
    };

    const getUniqueItems = () => {
      const uniqueItems = [];
      basket.forEach(item => {
        const existingItem = uniqueItems.find(unique => unique.id === item.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          uniqueItems.push({ ...item, quantity: 1 });
        }
      });
      return uniqueItems;
    };

    return (
      <WrappedComponent
        {...props}
        basket={basket}
        user={user}
        removeFromBasket={removeFromBasket}
        updateQuantity={updateQuantity}
        getUniqueItems={getUniqueItems}
        basketTotal={getBasketTotal(basket)}
        totalItems={basket.length}
      />
    );
  };

  CheckoutEnhancedComponent.displayName = `withCheckoutOperations(${WrappedComponent.displayName || WrappedComponent.name})`;

  return CheckoutEnhancedComponent;
};

export default withBasketOperations;