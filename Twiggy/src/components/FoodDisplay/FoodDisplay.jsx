import React from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import FoodItem from "../FoodItem/FoodItem.jsx";

function FoodDisplay({ category, searchQuery }) {
  const { foodList } = React.useContext(StoreContext);
  const filteredFoodList = foodList.filter(
    (food) =>
      category === "All" ||
      (food.category === category &&
        food.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  return (
    <div className="container">
      <div className="row">
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map((food, index) => (
            <FoodItem
              key={index}
              name={food.name}
              description={food.description}
              price={food.price}
              imageUrl={food.imageUrl}
              index={food.id} // Assuming food.id is the unique identifier
            />
          ))
        ) : (
          <p>No food items available.</p>
        )}
      </div>
    </div>
  );
}

export default FoodDisplay;
