import React, { createContext } from "react";
import axios from "axios";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [foodList, setFoodList] = React.useState([]);
  const [quantity, setQuantity] = React.useState({});
  const [token, setToken] = React.useState(null);

  const increaseQty = async (id) => {
    setQuantity((prevQty) => ({
      ...prevQty,
      [id]: (prevQty[id] || 0) + 1,
    }));
    await axios.post(
      "http://localhost:8080/api/cart",
      {
        foodId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const decreaseQty = async (id) => {
    setQuantity((prevQty) => {
      const newQty = (prevQty[id] || 0) - 1;
      if (newQty < 0) return prevQty; // Prevent negative quantity
      return {
        ...prevQty,
        [id]: newQty,
      };
    });
    await axios.delete(
      "http://localhost:8080/api/cart/remove/" + id,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

  const loadCartData = async (token) => {
    try {
      const response = await axios.get("http://localhost:8080/api/cart/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuantity(response.data.items);
      console.log("Cart data loaded:", response.data.items);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  React.useEffect(() => {
    fetchFoodList();
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      loadCartData(storedToken);
    }
  }, [token]);

  const contextValue = {
    foodList,
    increaseQty,
    decreaseQty,
    quantity,
    removeCartItem,
    token,
    setToken,
    setQuantity,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
