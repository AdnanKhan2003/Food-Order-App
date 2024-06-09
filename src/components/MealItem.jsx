import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import CartContext from "../store/cart-context.jsx";
import { useContext } from "react";

export default function MealItem({ meal }) {
  const contextValue = useContext(CartContext);
  function handleAddItemToCart() {
    console.log(meal);
    contextValue.addItem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-descrition">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddItemToCart}>Add To Cart</Button>
        </p>
      </article>
    </li>
  );
}
