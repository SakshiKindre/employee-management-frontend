import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/navbar.css";

import {
    FaHome,
    FaUsers,
    FaUserPlus,
    FaSignOutAlt,
    FaBuilding
} from "react-icons/fa";

function Navbar() {

    const navigate = useNavigate();

    const username = localStorage.getItem("username");

    const handleLogout = async () => {

        const result = await Swal.fire({
            title: "Logout?",
            text: "Do you really want to logout?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#2563EB",
            cancelButtonColor: "#dc3545",
            confirmButtonText: "Logout"
        });

        if (!result.isConfirmed) {
            return;
        }

        localStorage.clear();

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-expand-lg custom-navbar">

            <div className="container">

                <Link
                    className="navbar-brand"
                    to="/dashboard"
                >

                    <FaBuilding className="me-2"/>

                    EMS

                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto align-items-center">

                        <li className="nav-item">

                            <NavLink
                                className="nav-link"
                                to="/dashboard"
                            >

                                <FaHome className="me-1"/>

                                Dashboard

                            </NavLink>

                        </li>

                        <li className="nav-item">

                            <NavLink
                                className="nav-link"
                                to="/employees"
                            >

                                <FaUsers className="me-1"/>

                                Employees

                            </NavLink>

                        </li>

                        <li className="nav-item">

                            <NavLink
                                className="nav-link"
                                to="/employees/add"
                            >

                                <FaUserPlus className="me-1"/>

                                Add Employee

                            </NavLink>

                        </li>

                        <li className="nav-item ms-lg-4">

                            <span className="username">

                                👋 {username}

                            </span>

                        </li>

                        <li className="nav-item ms-lg-3">

                            <button
                                className="btn btn-danger logout-btn"
                                onClick={handleLogout}
                            >

                                <FaSignOutAlt className="me-2"/>

                                Logout

                            </button>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;