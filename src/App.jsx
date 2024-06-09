import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from "./store/cart-context.jsx";
import { ProgressContextProvider } from "./store/user-progress-context.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";

function App() {
  return (
    <ProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </ProgressContextProvider>
  );
}

export default App;
