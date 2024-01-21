
import { Button, Container, Navbar as NavbarBs } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart } from "../context/ShoppingCartContext";
const Navbar = () => {
    const {openCart, cartQuantity} = useShoppingCart()
  return (
    <>
      <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
        <Container className="me-auto">
          <Nav>
            <Nav.Link to="/" as={NavLink}>
              Home
            </Nav.Link>
            <Nav.Link to="/store" as={NavLink}>
              Store
            </Nav.Link>
            <Nav.Link to="/about" as={NavLink}>
              About
            </Nav.Link>
          </Nav>
          <Button
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle"
            onClick={openCart}
          >
            <FontAwesomeIcon icon={faCartShopping} />
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items"
              style={{
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                color:"#fff",
                transform:"translate(60%,-25%)"
              }}
            >
                {cartQuantity}
            </div>
          </Button>
        </Container>
      </NavbarBs>
    </>
  );
};

export default Navbar;
