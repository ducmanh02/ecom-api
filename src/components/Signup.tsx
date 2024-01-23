import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const Signup = () => {
  const [show, setShow] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [email, setEmail] = useState("");
  const [isAvailable, setIsAvailable] = useState("notClick");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkEmail = async () => {
    // const response = await checkEmailExist(email);
    setIsAvailable("false")
    
  };

  return (
    <>
      <p className="text-center" onClick={handleShow}>
        Sign Up
      </p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>SIGN UP</Modal.Title>
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput2"
            label="Name"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Tran Duc Manh" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          {isAvailable === "false" && (
            <p className="mx-3 text-danger">Email Exist!! API Check email đang lỗi</p>
          )}
        </Modal.Body>
        <Modal.Footer className="mx-auto w-100">
          <Button onClick={checkEmail} className="w-100">
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Signup;
