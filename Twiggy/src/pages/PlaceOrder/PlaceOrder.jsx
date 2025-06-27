import React, { useContext } from "react";
import { Link } from "react-router-dom";
import delivery from "../../assets/delivery.jpg";
import "./Placeorder.css";
import { use } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { calculateCartTotals } from "../../util/cartUtils";

function PlaceOrder() {
  const { foodList, increaseQty, decreaseQty, quantity } =
    React.useContext(StoreContext);

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const updatedCartItems = foodList.filter((food) => quantity[food.id] > 0);
    setCartItems(updatedCartItems);
  }, []);

  const { subtotal, shipping, tax, total } = calculateCartTotals(
    cartItems,
    quantity
  );

  return (
    <div className="container mb-5">
      <div className="py-5 text-center">
        <img className="d-block mx-auto " src={delivery} alt="Delivery" />
      </div>
      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">
              {cartItems.length}
            </span>
          </h4>
          <ul className="list-group mb-3">
            {cartItems.map((food) => (
              <li
                key={food.id}
                className="list-group-item d-flex justify-content-between lh-sm"
              >
                <div>
                  <h6 className="my-0">{food.name}</h6>
                  <small className="text-body-secondary">
                    Qty: {quantity[food.id]}
                  </small>
                </div>
                <span className="text-body-secondary">${food.price}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Shipping</span>
              <span className="text-body-secondary">${shipping}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Tax</span>
              <span className="text-body-secondary">${tax.toFixed(2)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>₹{total.toFixed(2)}</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" noValidate>
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder=""
                  required
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder=""
                  required
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                />
                <div className="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  required
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="address2" className="form-label">
                  Address 2{" "}
                  <span className="text-body-secondary">(Optional)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  placeholder="Apartment or suite"
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select className="form-select" id="country" required>
                  <option value="">Choose...</option>
                  <option>India</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <select className="form-select" id="state" required>
                  <option value="">Choose...</option>
                  <option>Tamil Nadu</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3">
                <label htmlFor="zip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder="600088"
                  required
                />
                <div className="invalid-feedback">Zip code required.</div>
              </div>
            </div>

            <hr className="my-4" />
            <button
              className="w-100 btn btn-primary btn-lg"
              type="submit"
              disabled={cartItems.length === 0}
            >
              Continue to checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
