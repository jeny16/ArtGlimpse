import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth';

const authService = {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                password
            });
            console.log("response", response);
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            console.log("error", error);
            throw error.response?.data || 'Failed to login';
        }
    },

    signup: async (username, email, password) => {
        try {
            const response = await axios.post(`${API_URL}/signup`, {
                username,
                email,
                password
            });
            console.log("response in s", response);
            if (response.config.data) {
                const data = JSON.parse(response.config.data);
                authService.login(data.email, data.password);
            }
            return JSON.parse(response.config.data);
        } catch (error) {
            throw error.response?.data?.message || 'Failed to register';
        }
    },

    logout: () => {
        localStorage.removeItem('user');
    }
};

export default authService;