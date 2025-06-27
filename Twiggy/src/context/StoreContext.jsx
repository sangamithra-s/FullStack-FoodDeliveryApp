import React, { createContext } from "react";
import axios from "axios";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [foodList, setFoodList] = React.useState([]);
  const [quantity, setQuantity] = React.useState({});

  const increaseQty = (id) => {
    setQuantity((prevQty) => ({
      ...prevQty,
      [id]: (prevQty[id] || 0) + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQuantity((prevQty) => {
      const newQty = (prevQty[id] || 0) - 1;
      if (newQty < 0) return prevQty; // Prevent negative quantity
      return {
        ...prevQty,
        [id]: newQty,
      };
    });
  };

  const removeCartItem = (id) => {
    setQuantity((prevQty) => {
      const newQty = { ...prevQty };
      delete newQty[id]; // Remove item from quantity state
      return newQty;
    });
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/foods");
      setFoodList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };
  React.useEffect(() => {
    fetchFoodList();
  }, []);

  const contextValue = {
    foodList,
    increaseQty,
    decreaseQty,
    quantity,
    removeCartItem,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
