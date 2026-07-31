import axiosInstance from "../api/axiosConfig";

export const login = (loginData) => {
    return axiosInstance.post("/auth/login", loginData);
};

export const register = (registerData) => {
    return axiosInstance.post("/auth/register", registerData);
};