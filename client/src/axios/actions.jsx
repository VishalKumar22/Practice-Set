import axios from "axios";
import getAuthHeader from "./token";

export const signup = async (formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_APIURL}/signup`, formData);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export const login = async (formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_APIURL}/login`, formData);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export const profile = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_APIURL}/profile`, { headers: await getAuthHeader() });
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export const update = async (userData) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_APP_APIURL}/update`, userData, { headers: await getAuthHeader() });
        return response.message; 
    } catch (error) {
        console.log(error.message);
    }
}
