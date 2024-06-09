import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import CartContext from "../store/cart-context";
import ProgressContext from "../store/user-progress-context";
import { useContext } from "react";

export default function Header() {
  const contextValue = useContext(CartContext);
  const progressContextValue = useContext(ProgressContext);

  function handleShowCart() {
    console.log("o");
    progressContextValue.showCart();
  }

  const totalQuantity = contextValue.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>
          Cart ({totalQuantity})
        </Button>
      </nav>
    </header>
  );
}
