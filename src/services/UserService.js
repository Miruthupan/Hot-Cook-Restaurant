import axios from "axios";

class UserService {
    static BASE_URL = "http://localhost:8080"

    static async login(email, password) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/api/auth/login`, { email, password });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                // Throw the specific error message received from the backend
                throw new Error(error.response.data.message);
            } else {
                // Throw a generic error if no specific message is available
                throw new Error("An unexpected error occurred during login.");
            }
        }
    }
    

    static async signup(name,email,password) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/api/auth/signup`, {name,email,password})
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;