import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { getAccount, handleCheckAccount } from "../api/api";


type token = {
  access_token: string;
  refresh_toke: string;
};
type User = {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
  avatar: string;
};

const Login = () => {
  const { isValidAccount, setIsValidAccount, setAccount } = useShoppingCart();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("NotLogIn");

  const validateAccount = async () => {
    const token: token = await handleCheckAccount(email, password);
    console.log(token);
    if (typeof token == "number") {
      setIsValidAccount("Wrong"); //////// not correct
      console.log(isValidAccount);
    } else {
      setIsValidAccount(email);
      handleClose();
      const user_raw: User =
        await getAccount(token.access_token);

      if (typeof user_raw == "object") {
        const user: User = user_raw;
        setAccount(user); // set Accout de kiem tra role
      }
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p className="text-center" onClick={handleShow}>
        Log In
      </p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>LOGIN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FloatingLabel>
          {isValidAccount === "Wrong" && (
            <p className="mx-3 text-danger">Incorrect Account Or Password</p>
          )}
        </Modal.Body>
        <Modal.Footer className="mx-auto w-100">
          <Button onClick={validateAccount} className="w-100">
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
