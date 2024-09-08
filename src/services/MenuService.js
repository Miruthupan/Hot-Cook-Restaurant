import axios from "axios";

class MenuService {
    static BASE_URL = "http://localhost:8080"

    static async getAllFoodItems(){
        try {
            const response = await axios.get(`${MenuService.BASE_URL}/api/order/getAllFoods`);
            return response.data;
        } catch (error) {
            console.error('Error fetching food items:', error);
            throw new Error('Could not fetch food items');
        }
    };
}

export default MenuService;