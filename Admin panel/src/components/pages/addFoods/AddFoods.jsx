import React, { useState, useEffect } from "react";
import { assets } from "../../../assets/assets";
import axios from "axios";
import { addFood } from "../../../services/foodService";
import { Toast } from "bootstrap/dist/js/bootstrap.bundle.min";
import { toast } from "react-toastify";

function AddFoods() {
  const [image, setImage] = React.useState(false);
  const [data, setData] = React.useState({
    name: "",
    description: "",
    price: "",
    category: "Biriyani",
  });

  useEffect(() => {
    // This effect can be used to fetch initial data or perform side effects
    // For now, it does nothing
    console.log(data);
  }, [data]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Handle form submission
    if (!image) {
      toast.error("Please upload an image.");
      return;
    }
    console.log("Form submitted:", data);
    addFood(data, image)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Food added successfully!");
          setData({
            name: "",
            description: "",
            price: "",
            category: "Biriyani",
          });
          setImage(null);
        }
      })
      .catch((error) => {
        console.error("Error adding food:", error);
      });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-4">
          <div className="card-body">
            <h2 className="mb-4">Add Food</h2>
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img
                    src={image ? URL.createObjectURL(image) : assets.upload}
                    alt="Upload"
                    width={98}
                  />
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter food name"
                  id="name"
                  name="name"
                  required
                  onChange={onChangeHandler}
                  value={data.name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="5"
                  name="description"
                  placeholder="Enter food description"
                  required
                  onChange={onChangeHandler}
                  value={data.description}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  placeholder="&#8377; 0.00"
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  required
                  onChange={onChangeHandler}
                  value={data.price}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  onChange={onChangeHandler}
                  value={data.category}
                >
                  <option value="">Select a category</option>
                  <option value="Biriyani">Biriyani</option>
                  <option value="Cake">Cake</option>
                  <option value="Burger">Burger</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Salad">Salad</option>
                  <option value="Ice Cream">Ice Cream</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFoods;
