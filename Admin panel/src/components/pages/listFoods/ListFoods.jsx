import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./ListFood.css"; // Assuming you have a CSS file for styling

function ListFoods() {
  const [list, setList] = React.useState([]);
  const fetchList = async () => {
    const response = await axios.get("http://localhost:8080/api/foods");
    console.log(response.data);
    if (response.status !== 200) {
      toast.error("Failed to fetch food list");
      return;
    }
    setList(response.data);
  };

  useEffect(() => {
    fetchList();
  }, []);

  async function deleteFood(id) {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/foods/${id}`
      );
      if (response.status === 200) {
        toast.success("Food deleted successfully");
        fetchList();
      } else {
        toast.error("Failed to delete food");
      }
    } catch (error) {
      toast.error("Failed to delete food");
    }
  }

  return (
    <div className="py-5 row justify-content-center">
      <h2>Food List</h2>
      <div className="col-12">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((food) => (
              <tr key={food.id}>
                <td>
                  <img
                    src={food.imageUrl}
                    alt={food.name}
                    style={{ width: "100px" }}
                  />
                </td>
                <td>{food.id}</td>
                <td>{food.name}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteFood(food.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListFoods;
