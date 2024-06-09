import { useContext } from "react";
import CartContext from "../store/cart-context";
import { currencyFormatter } from "../util/formatting";

export default function CartItem({
  name,
  item,
  price,
  quantity,
  onIncrease,
  onDecrease,
}) {
  const progressContextValue = useContext(CartContext);

  console.log(item);
  console.log(item.name);
  console.log(name);
  return (
    <li className="cart-item">
      {console.log(item)}
      {console.log(quantity)}
      <p>
        {name} - ({quantity} X {currencyFormatter.format(price)})
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
