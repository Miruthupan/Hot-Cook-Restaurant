import axios from 'axios';

const API_URL = 'http://localhost:8080/api/order'; // Base URL for your API

const FoodItemService = {
  // Get all food items
  getAllFoodItems: async () => {
    try {
      const response = await axios.get(`${API_URL}/getAllFoods`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch food items:', error);
      throw error;
    }
  },

  // Get a food item by ID
  getFoodItemById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch food item with ID ${id}:`, error);
      throw error;
    }
  },

  // Add a new food item
  addFoodItem: async (name, description, price, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      if (imageFile) formData.append('imageFile', imageFile);

      const response = await axios.post(`${API_URL}/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to add food item:', error);
      throw error;
    }
  },

  // Update an existing food item
  updateFoodItem: async (id, name, description, price, imageFile) => {
    try {
      const formData = new FormData();
      if (name) formData.append('name', name);
      if (description) formData.append('description', description);
      if (price) formData.append('price', price);
      if (imageFile) formData.append('imageFile', imageFile);

      const response = await axios.put(`${API_URL}/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to update food item with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a food item
  deleteFoodItem: async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
    } catch (error) {
      console.error(`Failed to delete food item with ID ${id}:`, error);
      throw error;
    }
  }
};

export default FoodItemService;
