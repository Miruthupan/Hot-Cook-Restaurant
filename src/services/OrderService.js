import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'http://localhost:8080/api/order';

// Function to get all orders
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getAllOrders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Function to delete an order by ID
export const deleteOrder = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/deleteOrder/${id}`);
  } catch (error) {
    console.error(`Error deleting order with id ${id}:`, error);
    throw error;
  }
};
