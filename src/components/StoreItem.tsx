import { Button, Card } from "react-bootstrap";
import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";
type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
  };
};

const styleTitle: React.CSSProperties = {
  padding: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2 /* number of lines to show */,
  lineClamp: 2,
  WebkitBoxOrient: "vertical",
};

const StoreItem = ({
  id,
  title,
  price,
  description,
  images,
  category,
}: StoreItemProps) => {
  const {
    getItemQuantity,
    decreaseCartQuantity,
    increaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity: number = getItemQuantity(id);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card>
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
          <Modal.Header closeButton>
            <Modal.Title>Detail Product:</Modal.Title>
          </Modal.Header>
          <Modal.Body className="">
            <Card.Img
              variant="top"
              src={images[0]}
              height="400px"
              style={{ objectFit: "cover" }}
              
            ></Card.Img>

            <h2>{title}</h2>
            <h5 className="text-muted"> Category: {category.name}</h5>
            <p>{description}</p>
            <p className="fs-5 text-muted"> {formatCurrency(price)}</p>
          </Modal.Body>
          <Modal.Footer>
            <div className="mt-auto">
              {quantity === 0 ? (
                <Button
                  className="w-100"
                  onClick={() => increaseCartQuantity(id)}
                >
                  + Add To Cart
                </Button>
              ) : (
                <div
                  className="d-flex align-items-center flex-column"
                  style={{ gap: "0.5rem" }}
                >
                  <div
                    className="d-flex align-items-center justify-content"
                    style={{ gap: ".5rem" }}
                  >
                    <Button
                      className="fs-e"
                      onClick={() => increaseCartQuantity(id)}
                    >
                      +
                    </Button>
                    <div>
                      <span className="fs-3">{quantity}</span>
                      in cart
                    </div>
                    <Button
                      className="fs-e"
                      onClick={() => decreaseCartQuantity(id)}
                    >
                      -
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Modal.Footer>
        </Modal>

        <Card.Img
          variant="top"
          src={images[0]}
          height="250px"
          style={{ objectFit: "cover" }}
          onClick={handleShow}
        ></Card.Img>
        <Card.Body className="d-flex flex-column">
          <Card.Title
            className="d-flex justify-content-between align-items-baseline mb-4"
            onClick={handleShow}
          >
            <span className="" style={styleTitle}>
              {title}
            </span>
            <span className="ms-2 fs-5 text-muted">
              {formatCurrency(price)}
            </span>
          </Card.Title>

          <div className="mt-auto">
            {quantity === 0 ? (
              <Button
                className="w-100"
                onClick={() => increaseCartQuantity(id)}
              >
                + Add To Cart
              </Button>
            ) : (
              <div
                className="d-flex align-items-center flex-column"
                style={{ gap: "0.5rem" }}
              >
                <div
                  className="d-flex align-items-center justify-content"
                  style={{ gap: "0.5rem" }}
                >
                  <Button
                    className="fs-e"
                    onClick={() => increaseCartQuantity(id)}
                  >
                    +
                  </Button>
                  <div>
                    <span style={{ fontSize: "0.75rem" }}>
                      {quantity} in cart
                    </span>
                  </div>
                  <Button
                    className="fs-e"
                    onClick={() => decreaseCartQuantity(id)}
                  >
                    -
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default StoreItem;
