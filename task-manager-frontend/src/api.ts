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

export const updateTask = async (
    taskId: number, 
    token: string, 
    title?: string, 
    description?: string, 
    bisComplete?: boolean
) => {
    try {
        await axios.put(`${API_URL}/tasks/${taskId}`, {
            title: title ?? undefined,
            description: description ?? undefined,
            bisComplete: bisComplete, // ✅ Ensure boolean value is sent
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        console.error("Error updating task:", error);
    }
};



export const deleteTask = async (taskId: number, token: string) => {
    return axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
