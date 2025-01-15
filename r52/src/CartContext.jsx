// CartContext.js
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";

// Create the Cart Context
export const CartContext = createContext();

// Create a Cart Provider component
export const CartProvider = ({ children }) => {
  // State for cart items (array of objects, each item could be { id, name, price, quantity, ... })
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cartItems from localStorage if available
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  // State for total price
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to update total price
  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Update totalPrice whenever cartItems change
  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cartItems));
    // Store cartItems in localStorage whenever it changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add an item to the cart

  const addItemToCart = useCallback(
    (product) => {
      const itemExists = cartItems.find((item) => item.id === product.id);

      if (itemExists) {
        // If item already exists, increase its quantity
        setCartItems(
          cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        // If item is new, add it to the cart with quantity 1
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    },
    [cartItems, setCartItems]
  ); // Dependencies for addItemToCart

  // Function to remove an item from the cart
  const removeItemFromCart = useCallback(
    (productId) => {
      setCartItems(cartItems.filter((item) => item.id !== productId));
    },
    [setCartItems]
  ); // Dependencies for removeItemFromCart

  // Function to increase item quantity
  const increaseItemQuantity = useCallback(
    (productId) => {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    },
    [cartItems, setCartItems]
  ); // Dependencies for increaseItemQuantity

  // Function to decrease item quantity
  const decreaseItemQuantity = useCallback(
    (productId) => {
      setCartItems(
        cartItems
          .map((item) =>
            item.id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item)
      ); // Remove if quantity becomes 0 (optional, can handle separately)
    },
    [cartItems, setCartItems]
  ); // Dependencies for decreaseItemQuantity

  // Function to update item quantity directly (e.g., from an input field)
  const updateItemQuantity = useCallback(
    (productId, quantity) => {
      const quantityNum = Number(quantity); // Ensure quantity is a number

      if (quantityNum > 0) {
        setCartItems(
          cartItems.map((item) =>
            item.id === productId ? { ...item, quantity: quantityNum } : item
          )
        );
      } else {
        // If quantity is set to 0 or less, remove the item
        removeItemFromCart(productId);
      }
    },
    [cartItems, setCartItems, removeItemFromCart]
  ); // Dependencies for updateItemQuantity

  // Function to clear the cart
  const clearCart = useCallback(() => {
    // useCallback for clearCart
    setCartItems([]);
  }, [setCartItems]); // Dependencies for clearCart

  // Value to be provided by the context
  const contextValue = useMemo(
    () => ({
      // Using useMemo here
      cartItems,
      totalPrice,
      addItemToCart,
      removeItemFromCart,
      increaseItemQuantity,
      decreaseItemQuantity,
      updateItemQuantity,
      clearCart,
    }),
    [
      cartItems,
      totalPrice,
      addItemToCart,
      removeItemFromCart,
      increaseItemQuantity,
      decreaseItemQuantity,
      updateItemQuantity,
      clearCart,
    ]
  ); // Dependencies array

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

// Custom hook to use the cart context in components
export const useCart = () => {
  return useContext(CartContext);
};
