import {
  Button,
  Container,
  Dropdown,
  NavItem,
  Navbar as NavbarBs,
} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart } from "../context/ShoppingCartContext";
import Login from "./Login";
import Signup from "./Signup";

const Navbar = () => {
  const {
    openCart,
    cartQuantity,
    isValidAccount,
    setIsValidAccount,
    Account,
    setAccount,
  } = useShoppingCart();

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
            {Account?.role === "admin" && (
              <Nav.Link to="/admin" as={NavLink} className="text-success">
                Admin Center
              </Nav.Link>
            )}
          </Nav>
          <div className="d-flex gap-4">
            <Dropdown as={NavItem}>
              <Dropdown.Toggle as={NavLink}>
                <Button
                  style={{
                    width: "3rem",
                    height: "3rem",
                    position: "relative",
                  }}
                  variant="outline-primary"
                  className="rounded-circle "
                >
                  <FontAwesomeIcon icon={faUser} />
                </Button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {isValidAccount === "NotLogIn" && (
                  <>
                    <Dropdown.Item>
                      <Login />
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Signup />
                    </Dropdown.Item>
                  </>
                )}
                {isValidAccount !== "NotLogIn" && (
                  <>
                    <Dropdown.Item>
                      <p
                        className="text-center"
                        onClick={() => {
                          setIsValidAccount("NotLogIn");
                          setAccount(undefined);
                        }}
                      >
                        Logout
                      </p>
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>

            <Button
              style={{ width: "3rem", height: "3rem", position: "relative" }}
              variant="outline-primary"
              className="rounded-circle "
              onClick={openCart}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              <div
                className="rounded-circle bg-danger d-flex justify-content-center align-items"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  position: "absolute",
                  color: "#fff",
                  transform: "translate(60%,-25%)",
                }}
              >
                {cartQuantity}
              </div>
            </Button>
          </div>
        </Container>
      </NavbarBs>
    </>
  );
};

export default Navbar;
