import { Button, Card, Modal, Table } from "react-bootstrap";
import { useShoppingCart } from "./../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import {  useState } from "react";
import { deleteProduct } from "../api/api";

const Admin = () => {
  const { dataP } = useShoppingCart();

  const [showDetail, setShowDetail] = useState(false);
  const [ProductId, setProductId] = useState(0);

  const ProductDetailFound = dataP?.find((e) => e.id === ProductId);

  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = (id: number) => {
    setProductId(id);
    setShowDetail(true);
  };
  const handleDeleteProduct =async (id:number) =>{
    const response = await deleteProduct(id)
    console.log(response)
  }
 



  return (
    <>
      <h1 className="text-center mb-5">Admin Page</h1>

      <Table className="align-middle" striped bordered hover size="sm">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>ID</th>
            <th style={{ width: "30%" }}>Title</th>
            <th style={{ width: "20%" }}>Image</th>
            <th style={{ width: "10%" }}>Price</th>
            <th style={{ width: "30%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataP?.map((e) => {
            console.log(e);
            return (
              <>
                <tr>
                  <td>{e.id}</td>
                  <td className="fw-bold">{e.title}</td>
                  <td>
                    <img src={e.images[0]} alt="" style={{ width: "250px" }} />
                  </td>
                  <td>{formatCurrency(e.price)}</td>
                  <td>
                    <div className="d-flex flex-column gap-3 align-items-center">
                      <Button
                        className="mx-2 w-50"
                        onClick={() => handleShowDetail(e.id)}
                      >
                        Detail
                      </Button>

                      <Button
                        className="mx-2 btn-danger w-50"
                        onClick={() => {
                          handleDeleteProduct(e.id)
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
      {ProductDetailFound && (
        <Modal show={showDetail} onHide={handleCloseDetail}>
          <Modal.Header closeButton>
            <Modal.Title>Detail Product:</Modal.Title>
          </Modal.Header>
          <Modal.Body className="">
            <Card.Img
              variant="top"
              src={ProductDetailFound.images[0]}
              height="400px"
              style={{ objectFit: "cover" }}
            ></Card.Img>

            <h2>{ProductDetailFound.title}</h2>
            <h5 className="text-muted">
              {" "}
              Category: {ProductDetailFound.category.name}
            </h5>
            <p>{ProductDetailFound.description}</p>
            <p className="fs-5 text-muted">
              {" "}
              {formatCurrency(ProductDetailFound.price)}
            </p>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Admin;
