import axiosInstance from "../api/axiosConfig";

export const getDashboardSummary = () => {
    return axiosInstance.get("/dashboard/summary");
};