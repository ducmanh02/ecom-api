/* eslint-disable @typescript-eslint/no-unused-vars */

import { useShoppingCart } from "../context/ShoppingCartContext";

import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { dataP, removeFromCart } = useShoppingCart();
  const item = dataP?.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <>
      <Stack direction="horizontal" gap={2}>
        <img
          src={item.images[0]}
          style={{ width: "125px", height: "75px", objectFit: "cover" }}
        />
        <div className="me-auto">
          <div>
            {item.title}
            {quantity > 1 && (
              <span className="text-muted" style={{ fontSize: "0.65rem" }}>
                {" "}
                {quantity}x
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: "0.75" }}>
            {formatCurrency(item.price)}
          </div>
        </div>
        <div>{formatCurrency(item.price * quantity)}</div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(item.id)}
        >
          &times;
        </Button>
      </Stack>
      
    </>
  );
};

export default CartItem;
