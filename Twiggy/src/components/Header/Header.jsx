import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="p-5 mb-4 bg-light rounded-4 mt-1">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">Welcome to Twiggy</h1>
        <p className="col-md-8 fs-4">
          Your one-stop destination for exploring and ordering delicious food in
          Chennai.
        </p>
        <Link to="/explore" className="btn btn-primary btn-lg">
          Explore Now
        </Link>
      </div>
    </div>
  );
}

export default Header;
