import axios from "axios";

const API_URL = "http://localhost:8080/api/foods";

export const addFood = async (foodData, image) => {
    const formData = new FormData();
    formData.append("food", JSON.stringify(foodData));
    formData.append("file", image);

    try {
        const response = await axios.post(
            API_URL,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error uploading food data:", error);
        throw error;
    }
}

export const fetchList = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching food list:", error);
        throw error;
    }
}

export const deleteFood = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting food:", error);
        throw error;
    }
}