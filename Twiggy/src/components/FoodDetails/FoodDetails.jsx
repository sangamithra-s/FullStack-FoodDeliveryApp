import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";

function FoodDetails() {
  const { id } = useParams();
  const { quantity, increaseQty, foodList } = React.useContext(StoreContext);

  const [data, setData] = useState({});
  const fetchFoodDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/foods/${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch food details");
      }
      console.log("Food details fetched successfully:", response.data);
      setData(response.data);
    } catch (error) {
      toast.error("Failed to fetch food details:", error);
    }
  };

  useEffect(() => {
    fetchFoodDetails(id);
  }, [id]);

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img
              className="card-img-top mb-5 mb-md-0"
              src={data.imageUrl}
              alt="..."
            />
          </div>
          <div className="col-md-6">
            <div className="fs-5 mb-1">
              Category:
              <span className="badge text-bg-warning">{data.category}</span>
            </div>
            <h1 className="display-5 fw-bolder">{data.name}</h1>
            <div className="fs-5 mb-2">
              <span>&#8377;{data.price}</span>
            </div>
            <p className="lead">{data.description}</p>
            <div className="d-flex">
              <button
                className="btn btn-outline-dark flex-shrink-0"
                type="button"
                onClick={() => increaseQty(data.id)}
              >
                <i className="bi-cart-fill me-1"></i>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FoodDetails;
