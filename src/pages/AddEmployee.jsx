import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Navbar from "../components/Navbar";

import { addEmployee } from "../services/employeeService";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaBuilding,
    FaMoneyBill,
    FaBriefcase
} from "react-icons/fa";

import "../styles/employee-form.css";

function AddEmployee() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [employee, setEmployee] = useState({

        firstName: "",

        lastName: "",

        email: "",

        phone: "",

        department: "",

        designation: "",

        salary: "",

        status: "Active"

    });

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
             !employee.phone || 
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

            await addEmployee(employee);

            Swal.fire({

                icon: "success",

                title: "Success",

                text: "Employee added successfully!",

                timer: 1800,

                showConfirmButton: false

            });

            navigate("/employees");

        } catch (error) {
    console.log(error.response);

    Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || JSON.stringify(error.response?.data)
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

                            Add Employee

                        </h2>

                        <p className="form-subtitle">

                            Fill the employee details below.

                        </p>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>

                                    First Name

                                </label>

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
                                        placeholder="Enter First Name"
                                    />

                                </div>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>

                                    Last Name

                                </label>

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
                                        placeholder="Enter Last Name"
                                    />

                                </div>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>

                                    Email

                                </label>

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
                                        placeholder="Enter Email"
                                    />

                                </div>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label> 

                                    Phone

                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">

                                        <FaPhone />

                                    </span>

                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="phone"
                                        value={employee.phone}
                                        onChange={handleChange}
                                        placeholder="Enter Phone Number"
                                    />

                                </div>

                            </div>
                                                        <div className="col-md-6 mb-3">

                                <label>

                                    Department

                                </label>

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
                                        placeholder="Enter Department"
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

                                        Saving...

                                    </>

                                ) : (

                                    <>

                                        <FaSave className="me-2" />

                                        Save Employee

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

export default AddEmployee;