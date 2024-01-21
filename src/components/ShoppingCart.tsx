import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";

type ShoppingCartProps = {
  isOpened: boolean;
};

const ShoppingCart = ({ isOpened }: ShoppingCartProps) => {
  const { closeCart, cartItem } = useShoppingCart();
  return (
    <Offcanvas show={isOpened} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItem.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </Stack>
        <div className="ms-auto fw-bold fs-5 mt-3">
          Total:{" "}
          {formatCurrency(
            cartItem.reduce((total, cartItem) => {
              const item = storeItems.find(i => i.id === cartItem.id);
              return total + (item?.price ||0) * cartItem.quantity;
            },0)
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
