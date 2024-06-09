import Modal from "./Modal";
import Button from "./UI/Button";
import CartContext from "../store/cart-context";
import ProgressContext from "../store/user-progress-context";
import CartItem from "./CartItem";
import { currencyFormatter } from "../util/formatting.js";

import { useContext } from "react";

export default function Cart() {
  const contextValue = useContext(CartContext);
  const progressContextValue = useContext(ProgressContext);

  function handleHideCart() {
    progressContextValue.hideCart();
  }

  function handleShowCheckout() {
    progressContextValue.showCheckout();
  }

  const totalPrice = contextValue.items.reduce(
    (acc, meal) => acc + meal.price * meal.quantity,
    0
  );
  return (
    <Modal
      open={progressContextValue.progress === "cart"}
      onClose={progressContextValue.progress === "cart" ? handleHideCart : null}
    >
      <h2>Your Cart</h2>
      {contextValue.items.length === 0 && <p>No items selected!!!</p>}
      <ul>
        {contextValue.items.map((meal) => console.log(meal))}
        {contextValue.items.map((meal) => (
          <CartItem
            key={meal.id}
            item={meal}
            name={meal.name}
            price={meal.price}
            quantity={meal.quantity}
            onIncrease={() => contextValue.addItem(meal)}
            onDecrease={() => contextValue.removeItem(meal.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button onClick={handleHideCart} textOnly>
          Close
        </Button>
        {contextValue.items.length > 0 && (
          <Button onClick={handleShowCheckout}>Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
