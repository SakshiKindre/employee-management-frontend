import axiosInstance from "../api/axiosConfig";

export const getEmployees = (
    page = 0,
    size = 5,
    sortBy = "id",
    direction = "asc"
) => {
    return axiosInstance.get("/employees", {
        params: {
            page,
            size,
            sortBy,
            direction
        }
    });
};

export const getEmployeeById = (id) => {
    return axiosInstance.get(`/employees/${id}`);
};

export const addEmployee = (employee) => {
    return axiosInstance.post("/employees", employee);
};

export const updateEmployee = (id, employee) => {
    return axiosInstance.put(`/employees/${id}`, employee);
};

export const deleteEmployee = (id) => {
    return axiosInstance.delete(`/employees/${id}`);
};

export const searchEmployees = (
    keyword,
    page = 0,
    size = 5,
    sortBy = "id",
    direction = "asc"
) => {
    return axiosInstance.get("/employees/search", {
        params: {
            keyword,
            page,
            size,
            sortBy,
            direction
        }
    });
};