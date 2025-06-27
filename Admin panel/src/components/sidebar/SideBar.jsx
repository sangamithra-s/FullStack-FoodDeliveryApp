import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = ({ sidebarVisible }) => {
  return (
    <div
      className={`border-end bg-white ${sidebarVisible ? "" : "d-none"}`}
      id="sidebar-wrapper"
    >
      <div className="sidebar-heading border-bottom bg-light">
        <img src={assets.delivery} alt="Logo" height={50} width={50} />
      </div>
      <div className="list-group list-group-flush">
        <Link
          className="list-group-item list-group-item-action list-group-item-light p-3"
          to="/add"
        >
          <i className="bi bi-plus-circle"></i> Add Foods
        </Link>
        <Link
          className="list-group-item list-group-item-action list-group-item-light p-3"
          to="/list"
        >
          <i className="bi bi-list"></i> List Foods
        </Link>
        <Link
          className="list-group-item list-group-item-action list-group-item-light p-3"
          to="/orders"
        >
          <i className="bi bi-cart"></i> Orders
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
