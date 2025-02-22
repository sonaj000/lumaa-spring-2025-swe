import axios from "axios";

const API_URL = "http://localhost:3001";

export const loginUser = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    return response.data.token; // Returns JWT token
};

export const registerUser = async (username: string, password: string) => {
    return axios.post(`${API_URL}/auth/register`, { username, password });
};

export const getTasks = async (token: string) => {
    return axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const createTask = async (title: string, description: string, token: string) => {
    return axios.post(`${API_URL}/tasks`, { title, description }, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateTask = async (taskId: number, title: string, description: string, bisComplete: boolean, token: string) => {
    return axios.put(`${API_URL}/tasks/${taskId}`, { title, description, bisComplete }, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteTask = async (taskId: number, token: string) => {
    return axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
