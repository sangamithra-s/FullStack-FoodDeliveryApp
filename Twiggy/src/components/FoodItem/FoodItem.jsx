import React from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";

function FoodItem({ name, description, price, imageUrl, index }) {
  const { increaseQty, decreaseQty, quantity } = React.useContext(StoreContext);
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
      <div className="card" style={{ maxWidth: "320px" }}>
        <img
          src={imageUrl}
          className="card-img-top"
          alt="Product Image"
          height={300}
          width={60}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="h5 mb-0">&#8377;{price}</span>
            <div>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-half text-warning"></i>
              <small className="text-muted">(4.5)</small>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between bg-light">
          <Link to={`/food/${index}`} className="btn btn-primary btn-sm">
            View Food
          </Link>
          {quantity[index] > 0 ? (
            <div className="d-flex align-items-center">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => decreaseQty(index)}
              >
                <i className="bi bi-dash"></i>
              </button>
              <span className="mx-2">{quantity[index]}</span>
              <button
                className="btn btn-success btn-sm"
                onClick={() => increaseQty(index)}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => increaseQty(index)}
            >
              <i className="bi bi-plus-circle"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodItem;
