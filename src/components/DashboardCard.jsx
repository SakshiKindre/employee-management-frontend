import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import { getDashboardSummary } from "../services/dashboardService";

import {
    FaUsers,
    FaUserCheck,
    FaBuilding,
    FaMoneyBillWave,
    FaArrowRight,
    FaCheckCircle
} from "react-icons/fa";

import "../styles/dashboard.css";

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

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <>
                <Navbar />

                <div className="container text-center mt-5">

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

            <div className="container-fluid dashboard-container">

                {/* Header */}

                <div className="dashboard-header">

                    <div>

                        <h2>

                            👋 Welcome Back,
                            {" "}
                            {localStorage.getItem("username")}

                        </h2>

                        <p>

                            Employee Management Dashboard

                        </p>

                    </div>

                </div>

                {/* Cards */}

                <div className="row mt-4">

                    <DashboardCard

                        title="Total Employees"

                        value={summary.totalEmployees}

                        icon={<FaUsers size={40} />}

                        color="primary-card"

                    />

                    <DashboardCard

                        title="Active Employees"

                        value={summary.activeEmployees}

                        icon={<FaUserCheck size={40} />}

                        color="success-card"

                    />

                    <DashboardCard

                        title="Departments"

                        value={summary.departmentCount}

                        icon={<FaBuilding size={40} />}

                        color="warning-card"

                    />

                    <DashboardCard

                        title="Average Salary"

                        value={`₹ ${summary.averageSalary.toFixed(2)}`}

                        icon={<FaMoneyBillWave size={40} />}

                        color="danger-card"

                    />

                </div>

                {/* Quick Actions */}

                <div className="row mt-4">

                    <div className="col-lg-6 mb-4">

                        <div className="dashboard-box">

                            <h4>

                                🚀 Quick Actions

                            </h4>

                            <div className="mt-4">

                                <Link
                                    to="/employees/add"
                                    className="btn btn-primary me-3"
                                >

                                    Add Employee

                                </Link>

                                <Link
                                    to="/employees"
                                    className="btn btn-success"
                                >

                                    View Employees

                                </Link>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-6 mb-4">

                        <div className="dashboard-box">

                            <h4>

                                📈 System Status

                            </h4>

                            <ul className="status-list">

                                <li>

                                    <FaCheckCircle
                                        className="text-success me-2"
                                    />

                                    Backend Connected

                                </li>

                                <li>

                                    <FaCheckCircle
                                        className="text-success me-2"
                                    />

                                    JWT Authentication Enabled

                                </li>

                                <li>

                                    <FaCheckCircle
                                        className="text-success me-2"
                                    />

                                    Database Connected

                                </li>

                                <li>

                                    <FaCheckCircle
                                        className="text-success me-2"
                                    />

                                    REST APIs Running

                                </li>

                            </ul>

                        </div>

                    </div>

                </div>

                {/* Features */}

                <div className="dashboard-box mt-2">

                    <h4>

                        Project Features

                    </h4>

                    <div className="row mt-3">

                        <div className="col-md-3">

                            <p>

                                <FaArrowRight className="text-primary me-2" />

                                Employee CRUD

                            </p>

                        </div>

                        <div className="col-md-3">

                            <p>

                                <FaArrowRight className="text-primary me-2" />

                                JWT Authentication

                            </p>

                        </div>

                        <div className="col-md-3">

                            <p>

                                <FaArrowRight className="text-primary me-2" />

                                Search & Pagination

                            </p>

                        </div>

                        <div className="col-md-3">

                            <p>

                                <FaArrowRight className="text-primary me-2" />

                                Dashboard Analytics

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Dashboard;