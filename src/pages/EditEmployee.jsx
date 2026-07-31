import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import Navbar from "../components/Navbar";

import {
    getEmployeeById,
    updateEmployee
} from "../services/employeeService";

import {
    FaUser,
    FaEnvelope,
    FaBuilding,
    FaBriefcase,
    FaMoneyBillWave,
    FaCheckCircle,
    FaSave,
    FaTimes
} from "react-icons/fa";

import "../styles/employee-form.css";

function EditEmployee() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [employee, setEmployee] = useState({

        firstName: "",

        lastName: "",

        email: "",

        department: "",

        designation: "",

        salary: "",

        status: "Active"

    });

    useEffect(() => {

        loadEmployee();

    }, []);

    const loadEmployee = async () => {

        try {

            const response = await getEmployeeById(id);

            setEmployee(response.data.data);

        } catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Unable to load employee."

            });

        }

    };

    const handleChange = (e) => {

        setEmployee({

            ...employee,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !employee.firstName ||
            !employee.lastName ||
            !employee.email ||
            !employee.department ||
            !employee.designation ||
            !employee.salary
        ) {

            Swal.fire({

                icon: "warning",

                title: "Missing Fields",

                text: "Please fill all fields."

            });

            return;

        }

        setLoading(true);

        try {

            await updateEmployee(id, employee);

            Swal.fire({

                icon: "success",

                title: "Updated",

                text: "Employee updated successfully.",

                timer: 1800,

                showConfirmButton: false

            });

            navigate("/employees");

        } catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Unable to update employee."

            });

        } finally {

            setLoading(false);

        }

    };

    return (

        <>

            <Navbar />

            <div className="employee-form-page">

                <div className="employee-form-card">

                    <div className="mb-4">

                        <h2 className="form-title">

                            Edit Employee

                        </h2>

                        <p className="form-subtitle">

                            Update employee information.

                        </p>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>First Name</label>

                                <div className="input-group">

                                    <span className="input-group-text">

                                        <FaUser />

                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        value={employee.firstName}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Last Name</label>

                                <div className="input-group">

                                    <span className="input-group-text">

                                        <FaUser />

                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={employee.lastName}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Email</label>

                                <div className="input-group">

                                    <span className="input-group-text">

                                        <FaEnvelope />

                                    </span>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={employee.email}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Department</label>

                                <div className="input-group">

                                    <span className="input-group-text">

                                        <FaBuilding />

                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="department"
                                        value={employee.department}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>
                                                        <div className="col-md-6 mb-3">

                                <label>

                                    Designation

                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">

                                        <FaBriefcase />

                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="designation"
                                        value={employee.designation}
                                        onChange={handleChange}
                                        placeholder="Enter Designation"
                                    />

                                </div>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>

                                    Salary

                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">

                                        <FaMoneyBillWave />

                                    </span>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="salary"
                                        value={employee.salary}
                                        onChange={handleChange}
                                        placeholder="Enter Salary"
                                    />

                                </div>

                            </div>

                            <div className="col-md-6 mb-4">

                                <label>

                                    Status

                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">

                                        <FaCheckCircle />

                                    </span>

                                    <select
                                        className="form-select"
                                        name="status"
                                        value={employee.status}
                                        onChange={handleChange}
                                    >

                                        <option value="Active">
                                            Active
                                        </option>

                                        <option value="Inactive">
                                            Inactive
                                        </option>

                                    </select>

                                </div>

                            </div>

                        </div>

                        <div className="d-flex justify-content-end gap-3 mt-4">

                            <button
                                type="button"
                                className="btn btn-secondary px-4"
                                onClick={() => navigate("/employees")}
                            >

                                <FaTimes className="me-2" />

                                Cancel

                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary px-4"
                                disabled={loading}
                            >

                                {loading ? (

                                    <>

                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                        ></span>

                                        Updating...

                                    </>

                                ) : (

                                    <>

                                        <FaSave className="me-2" />

                                        Update Employee

                                    </>

                                )}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </>

    );

}

export default EditEmployee;