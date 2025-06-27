import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListFoods from "./components/pages/listFoods/listFoods";
import Orders from "./components/pages/Orders/orders";
import AddFoods from "./components/pages/addFoods/addFoods";
import Sidebar from "./components/sidebar/sidebar";
import Menubar from "./components/Menubar/Menubar";
import { ToastContainer } from "react-toastify";

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar sidebarVisible={sidebarOpen} />
      <div id="page-content-wrapper">
        <Menubar toggleSidebar={toggleSidebar} />
        <ToastContainer />
        <div className="container-fluid">
          <Routes>
            <Route path="/add" element={<AddFoods />} />
            <Route path="/list" element={<ListFoods />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/" element={<ListFoods />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
