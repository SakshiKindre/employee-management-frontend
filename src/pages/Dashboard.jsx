import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getDashboardSummary } from "../services/dashboardService";
import "../styles/dashboard.css";

import {
    FaUsers,
    FaBuilding,
    FaMoneyBillWave,
    FaUserCheck
} from "react-icons/fa";

function Dashboard() {

    const [summary, setSummary] = useState({
        totalEmployees: 0,
        activeEmployees: 0,
        departmentCount: 0,
        averageSalary: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getDashboardSummary();

            setSummary(response.data.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load dashboard.");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <>
                <Navbar />

                <div className="container mt-5 text-center">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                    </div>

                    <h5 className="mt-3">
                        Loading Dashboard...
                    </h5>

                </div>
            </>

        );

    }

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold">
                            Dashboard
                        </h2>

                        <p className="text-muted">
                            Welcome back,
                            <strong> {localStorage.getItem("username")}</strong>
                        </p>

                    </div>

                    <Link
                        to="/employees/add"
                        className="btn btn-primary"
                    >
                        + Add Employee
                    </Link>

                </div>

                <div className="row g-4">

                    <div className="col-md-3">

                        <div className="card shadow border-0">

                            <div className="card-body text-center">

                                <FaUsers
                                    size={45}
                                    className="text-primary mb-3"
                                />

                                <h6>Total Employees</h6>

                                <h2 className="fw-bold">

                                    {summary.totalEmployees}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow border-0">

                            <div className="card-body text-center">

                                <FaUserCheck
                                    size={45}
                                    className="text-success mb-3"
                                />

                                <h6>Active Employees</h6>

                                <h2 className="fw-bold">

                                    {summary.activeEmployees}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow border-0">

                            <div className="card-body text-center">

                                <FaBuilding
                                    size={45}
                                    className="text-warning mb-3"
                                />

                                <h6>Departments</h6>

                                <h2 className="fw-bold">

                                    {summary.departmentCount}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow border-0">

                            <div className="card-body text-center">

                                <FaMoneyBillWave
                                    size={45}
                                    className="text-danger mb-3"
                                />

                                <h6>Average Salary</h6>

                                <h2 className="fw-bold">

                                    ₹ {summary.averageSalary.toFixed(2)}

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card shadow border-0 mt-5">

                    <div className="card-body">

                        <h4 className="mb-3">

                            Quick Actions

                        </h4>

                        <div className="d-flex gap-3">

                            <Link
                                to="/employees"
                                className="btn btn-outline-primary"
                            >
                                View Employees
                            </Link>

                            <Link
                                to="/employees/add"
                                className="btn btn-success"
                            >
                                Add Employee
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Dashboard;