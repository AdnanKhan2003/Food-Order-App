import Modal from "./Modal.jsx";
import Input from "./Input.jsx";
import Button from "./UI/Button.jsx";
import ProgressContext from "../store/user-progress-context.jsx";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting.js";
import CartContext from "../store/cart-context.jsx";
import { useHttp } from "../hooks/useHttp.js";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const progressContextValue = useContext(ProgressContext);
  const contextValue = useContext(CartContext);
  const totalPrice = contextValue.items.reduce(
    (acc, meal) => acc + meal.price * meal.quantity,
    0
  );
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  function handleHideCheckout() {
    progressContextValue.hideCheckout();
  }

  function handleClearCart() {
    contextValue.clearCart();
    progressContextValue.hideCheckout();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: contextValue.items,
          customer: customerData,
        },
      })
    );
  }

  let button = (
    <>
      <Button onClick={handleHideCheckout} type="button" textOnly>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isSending) {
    button = <Button>Sending Order....</Button>;
  }

  if (data && !error) {
    return (
      <Modal
        open={progressContextValue.progress === "checkout"}
        onClose={handleClearCart}
      >
        <h2>Sucess!</h2>
        <p>Your order was submitted sucessfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes
        </p>
        <p className="modal-actions">
          <Button onClick={handleClearCart}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal
      open={progressContextValue.progress === "checkout"}
      onClose={handleHideCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="city" type="text" id="city" />
        </div>
        <p className="modal-actions">{button}</p>
      </form>
    </Modal>
  );
}
