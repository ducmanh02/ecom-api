import { Col, Form, Row, Spinner } from "react-bootstrap";
import "../assets/style/style.css"
import StoreItem from "../components/StoreItem";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { SetStateAction, useState } from "react";

type Product = {
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

const Store = () => {
  const { dataC, dataP, isLoadingP } = useShoppingCart();
  const [keyword, setKeyWord] = useState("");
  const [selectedOption, setSelectedOption] = useState("all");

  const filteredItemsBySearch = (arrayP: Product[] | undefined) =>
    arrayP?.filter((product) => {
      return product.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });
  const filteredItemsByFilter = (arrayP: Product[] | undefined) =>
    arrayP?.filter((product) => {
      return product.category.name.indexOf(selectedOption) !== -1;
    });

  let resultProduct = null;

  if (selectedOption !== "all") {
    const resultProduct1 = filteredItemsByFilter(dataP);
    resultProduct = filteredItemsBySearch(resultProduct1);
  } else {
    resultProduct = filteredItemsBySearch(dataP);
  }

  console.log(selectedOption);

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

      {/* filter */}
      {isLoadingP === true && (
        <Spinner animation="border" role="status" className="spinner">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <Row>
        <Col sm={2}>
          <Row>
            <div className="container my-4 ">
              <form>
                <div className="form-check ">
                  <input
                    type="radio"
                    name="options"
                    value="all"
                    className="form-check-input"
                    onChange={() => handleOptionChange("all")}
                    checked={selectedOption === "all"}
                  />
                  <label className="form-check-label">All</label>
                </div>
                {dataC?.map((option) => (
                  <div key={option.id} className="form-check ">
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
          </Row>
        </Col>
        <Col sm={10}>
          <Row sm={1} md={2} lg={4} className="g-3">
            {resultProduct !== undefined &&
              resultProduct.map((item) => (
                <Col key={item.id}>
                  <StoreItem {...item} />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>


    </>
  );
};

export default Store;
