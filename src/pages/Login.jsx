import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import "../styles/login.css";

import {
    FaUser,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaBuilding
} from "react-icons/fa";

function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        username: "",
        password: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.username ||
            !formData.password
        ) {

            setError("Username and Password are required.");

            return;

        }

        setLoading(true);

        setError("");

        try {

            const response = await login(formData);

            if (response.data.success) {

                localStorage.setItem(
                    "token",
                    response.data.data.token
                );

                localStorage.setItem(
                    "username",
                    response.data.data.username
                );

                localStorage.setItem(
                    "role",
                    response.data.data.role
                );

                navigate("/dashboard");

            } else {

                setError(response.data.message);

            }

        } catch (err) {

            if (
                err.response &&
                err.response.data
            ) {

                setError(err.response.data.message);

            } else {

                setError(
                    "Unable to connect to server."
                );

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            <div className="row g-0 login-wrapper">

                <div className="col-lg-6 left-panel">

                    <div className="overlay">

                        <FaBuilding className="company-icon" />

                        <h1>

                            Employee Management System

                        </h1>

                        <p>

                            Secure Employee Portal

                        </p>

                        <div className="features">

                            <div>✔ Secure JWT Authentication</div>

                            <div>✔ Employee Dashboard</div>

                            <div>✔ Employee Management</div>

                            <div>✔ Search & Pagination</div>

                            <div>✔ Responsive Design</div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-6 right-panel">

                    <div className="login-card">

                        <h2>

                            Welcome Back 👋

                        </h2>

                        <p>

                            Login to continue

                        </p>

                        {error && (

                            <div className="alert alert-danger">

                                {error}

                            </div>

                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label>

                                    Username

                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">

                                        <FaUser />

                                    </span>

                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Enter Username"
                                    />

                                </div>

                            </div>

                            <div className="mb-4">

                                <label>

                                    Password

                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">

                                        <FaLock />

                                    </span>

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter Password"
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                    >
                                        {showPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />}
                                    </button>

                                </div>

                            </div>
                                                        <div className="d-flex justify-content-between align-items-center mb-4">

                                <div className="form-check">

                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="remember"
                                    />

                                    <label
                                        className="form-check-label"
                                        htmlFor="remember"
                                    >
                                        Remember Me
                                    </label>

                                </div>

                                <a
                                    href="#"
                                    className="text-decoration-none"
                                >
                                    Forgot Password?
                                </a>

                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100 login-btn"
                                disabled={loading}
                            >

                                {loading ? (

                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                        ></span>

                                        Logging In...

                                    </>

                                ) : (

                                    "LOGIN"

                                )}

                            </button>

                        </form>

                        <div className="text-center mt-4">

                            <p>

                                Don't have an account?

                                <Link
                                    to="/register"
                                    className="ms-2 text-decoration-none fw-bold"
                                >
                                    Register
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;