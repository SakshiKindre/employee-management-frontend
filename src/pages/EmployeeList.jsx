import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmployeeAvatar from "../components/EmployeeAvatar";
import Swal from "sweetalert2";

import {
    FaSearch,
    FaPlus,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import {
    getEmployees,
    deleteEmployee,
    searchEmployees
} from "../services/employeeService";

import "../styles/employee.css";

function EmployeeList() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const [keyword, setKeyword] = useState("");

    const [currentPage, setCurrentPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [pageSize] = useState(5);

    useEffect(() => {

        if (keyword.trim() === "") {

            loadEmployees(currentPage);

        } else {

            loadSearchEmployees(currentPage);

        }

    }, [currentPage]);

    const loadEmployees = async (page = 0) => {

        setLoading(true);

        try {

            const response = await getEmployees(
                page,
                pageSize
            );

            setEmployees(response.data.data);

            setCurrentPage(response.data.meta.page);

            setTotalPages(response.data.meta.totalPages);

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to load employees."
            });

        } finally {

            setLoading(false);

        }

    };

    const loadSearchEmployees = async (page = 0) => {

        setLoading(true);

        try {

            const response = await searchEmployees(
                keyword,
                page,
                pageSize
            );

            setEmployees(response.data.data);

            setCurrentPage(response.data.meta.page);

            setTotalPages(response.data.meta.totalPages);

        } finally {

            setLoading(false);

        }

    };

    const handleSearch = async (e) => {

        const value = e.target.value;

        setKeyword(value);

        setCurrentPage(0);

        if (value.trim() === "") {

            loadEmployees(0);

            return;

        }

        try {

            const response = await searchEmployees(
                value,
                0,
                pageSize
            );

            setEmployees(response.data.data);

            setTotalPages(response.data.meta.totalPages);

        } catch (error) {

            console.error(error);

        }

    };

    const handleDelete = async (id) => {

        const result = await Swal.fire({

            title: "Delete Employee?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Delete",

            confirmButtonColor: "#dc3545"

        });

        if (!result.isConfirmed) {

            return;

        }

        try {

            await deleteEmployee(id);

            Swal.fire({

                icon: "success",

                title: "Deleted!",

                timer: 1500,

                showConfirmButton: false

            });

            if (keyword.trim() === "") {

                loadEmployees(currentPage);

            } else {

                loadSearchEmployees(currentPage);

            }

        } catch (error) {

            Swal.fire({

                icon: "error",

                title: "Unable to delete employee."

            });

        }

    };

    return (

        <>
            <Navbar />

            <div className="employee-page">

                <div className="employee-card">

                    <div className="d-flex justify-content-between align-items-center flex-wrap">

                        <div>

                            <h2 className="employee-title">

                                Employee Management

                            </h2>

                            <p className="employee-subtitle">

                                Manage all employees in one place.

                            </p>

                        </div>

                        <Link
                            to="/employees/add"
                            className="btn btn-primary"
                        >

                            <FaPlus className="me-2"/>

                            Add Employee

                        </Link>

                    </div>

                    <div className="row mt-4 mb-3">

                        <div className="col-lg-5">

                            <div className="input-group search-box">

                                <span className="input-group-text">

                                    <FaSearch/>

                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search employee..."
                                    value={keyword}
                                    onChange={handleSearch}
                                />

                            </div>

                        </div>

                        <div className="col-lg-7 text-lg-end mt-3 mt-lg-0">

                            <span className="employee-count">

                                Total Employees : {employees.length}

                            </span>

                        </div>

                    </div>
                                        {loading ? (

                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            >
                            </div>

                        </div>

                    ) : employees.length === 0 ? (

                        <div className="empty-state">

                            <h1>📂</h1>

                            <h4>No Employees Found</h4>

                            <p>

                                Try changing your search or add a new employee.

                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>Employee</th>

                                        <th>Department</th>

                                        <th>Designation</th>

                                        <th>Salary</th>

                                        <th>Status</th>

                                        <th className="text-center">

                                            Actions

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {employees.map((employee) => (

                                        <tr key={employee.id}>

                                            <td>

                                                {employee.id}

                                            </td>

                                            <td>

                                                <EmployeeAvatar
                                                    firstName={employee.firstName}
                                                    lastName={employee.lastName}
                                                />

                                                <div className="small text-muted ms-5">

                                                    {employee.email}

                                                </div>

                                            </td>

                                            <td>

                                                {employee.department}

                                            </td>

                                            <td>

                                                {employee.designation}

                                            </td>

                                            <td>

                                                ₹ {employee.salary}

                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        employee.status === "Active"
                                                            ? "badge bg-success"
                                                            : "badge bg-danger"
                                                    }
                                                >

                                                    {employee.status}

                                                </span>

                                            </td>

                                            <td className="text-center">

                                                <Link
                                                    to={`/employees/edit/${employee.id}`}
                                                    className="btn btn-warning btn-sm me-2"
                                                    title="Edit Employee"
                                                >

                                                    <FaEdit />

                                                </Link>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    title="Delete Employee"
                                                    onClick={() =>
                                                        handleDelete(employee.id)
                                                    }
                                                >

                                                    <FaTrash />

                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                    <nav className="mt-4">

                        <ul className="pagination justify-content-center">

                            <li
                                className={`page-item ${
                                    currentPage === 0
                                        ? "disabled"
                                        : ""
                                }`}
                            >

                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
                                >

                                    ← Previous

                                </button>

                            </li>

                            {[...Array(totalPages).keys()].map((page) => (

                                <li
                                    key={page}
                                    className={`page-item ${
                                        currentPage === page
                                            ? "active"
                                            : ""
                                    }`}
                                >

                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            setCurrentPage(page)
                                        }
                                    >

                                        {page + 1}

                                    </button>

                                </li>

                            ))}

                            <li
                                className={`page-item ${
                                    currentPage === totalPages - 1
                                        ? "disabled"
                                        : ""
                                }`}
                            >

                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                    }
                                >

                                    Next →

                                </button>

                            </li>

                        </ul>

                    </nav>

                </div>

            </div>

        </>

    );

}

export default EmployeeList;