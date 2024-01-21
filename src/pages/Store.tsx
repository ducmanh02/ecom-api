import { Col, Form, Row, Spinner } from "react-bootstrap";

import StoreItem from "../components/StoreItem";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { SetStateAction, useState } from "react";

const Store = () => {
  const { dataC, dataP, isLoadingP } = useShoppingCart();
  const [keyword, setKeyWord] = useState("");
  const [selectedOption, setSelectedOption] = useState("all");

  const filteredItemsBySearch = dataP?.filter((product) => {
    if (keyword !== null || keyword !== "") {
      return product.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    }
    if (selectedOption !== "all") {
      return product.category.name
        .toLowerCase()
        .indexOf(selectedOption.toLowerCase()) !== -1;
    }
    if(keyword === "" || selectedOption === "all"){
      return product
    }
  });

  const handleOptionChange = (option: SetStateAction<string>) => {
    setSelectedOption(option);
  };

  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setTimeout(() => {
      setKeyWord(e.target.value);
    }, 500);
  };

  return (
    <>
      <h1 className="mb-5 text-center">Store</h1>

      {/* Search */}
      <Form>
        <Form.Group className="mb-5" controlId="formBasicEmail">
          <Form.Label>Key Word To Search: </Form.Label>
          <Form.Control
            type="text"
            placeholder="What do you want to search?"
            onChange={handleSearch}
          />
          <Form.Text className="text-muted">Ex: shoes...</Form.Text>
        </Form.Group>
      </Form>
      <div className="container mt-4">
        <form>
          {dataC?.map((option) => (
            <div key={option.id} className="form-check">
              <input
                type="radio"
                name="options"
                value={option.name}
                className="form-check-input"
                checked={selectedOption === option.name}
                onChange={() => handleOptionChange(option.name)}
              />
              <label htmlFor={option.name} className="form-check-label">
                {option.name}
              </label>
            </div>
          ))}
        </form>
      </div>
      {isLoadingP === true && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <Row sm={1} md={2} lg={4} className="g-3">
        {filteredItemsBySearch !== undefined &&
          filteredItemsBySearch.map((item) => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))}
      </Row>
      
    </>
  );
};

export default Store;
