import { createContext } from "react";
import { useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function reducerCart(state, action) {
  if (action.type === "ADD_ITEM") {
    // Duplicate state
    const updatedItems = [...state.items];

    // const existingItemIndex = state.items.findIndex(
    //   (meal) => meal.items.id === action.item.id
    // );
    const existingItemIndex = state.items.findIndex(
      (meal) => meal.id === action.item.id
    );
    const existingItemIndex23 = state.items.findIndex((meal) =>
      console.log(meal, action)
    );
    console.log("my existence", existingItemIndex);

    if (existingItemIndex > -1) {
      const existingItem = state.items[existingItemIndex];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const updatedItems = [...state.items];

    const existingItemIndex = state.items.findIndex((meal) => {
      console.log(meal);
      console.log(action);
      return meal.id === action.id;
    });

    const existingItem = state.items[existingItemIndex];
    console.log("up bihar", existingItem, state);

    if (existingItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(reducerCart, { items: [] });

  function addItem(item) {
    console.log(item);
    dispatchCartAction({
      type: "ADD_ITEM",
      item,
    });
  }

  function removeItem(id) {
    console.log(id);
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id,
    });
  }

  function clearCart() {
    dispatchCartAction({
      type: "CLEAR_CART",
    });
  }

  const contextValue = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
