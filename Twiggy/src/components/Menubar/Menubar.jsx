import React from "react";
import "./Menubar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

function Menubar() {
  const [active, setActive] = React.useState("Home");
  const { quantity, token, setToken, setQuantity } =
    React.useContext(StoreContext);
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setQuantity({});
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <img
          src={assets.delivery}
          alt="Cart"
          className="navbar-brand mx-4"
          height={50}
          width={50}
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  active === "Home" ? "fw-bold active" : ""
                }`}
                aria-current="page"
                to="/"
                onClick={() => setActive("Home")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  active === "Explore" ? "fw-bold active" : ""
                }`}
                aria-current="page"
                to="/explore"
                onClick={() => setActive("Explore")}
              >
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  active === "Contact" ? "fw-bold active" : ""
                }`}
                aria-current="page"
                to="/contact"
                onClick={() => setActive("Contact")}
              >
                Contact Us
              </Link>
            </li>
          </ul>
          {!token ? (
            <>
              <Link to="/login">
                <button className="btn btn-outline-success mx-1">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-outline-primary mx-1">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <div className="dropdown text-end">
              <Link to="/" className="btn btn-danger ms-3" onClick={logout}>
                Logout
              </Link>
            </div>
          )}
          <div className="d-flex align-items-center gap-4">
            <div className="position-relative">
              <Link to="/cart">
                <img src={assets.cart} alt="cart" height={32} width={32} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {Object.values(quantity).reduce((acc, qty) => acc + qty, 0)}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Menubar;
