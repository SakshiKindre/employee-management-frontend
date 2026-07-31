import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";
import "../styles/login.css";

import {
    FaUser,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaBuilding
} from "react-icons/fa";

function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

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

        if (!formData.username || !formData.password) {

            setError("Username and Password are required.");
            return;

        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {

            const response = await register(formData);

            if (response.data.success) {

                setSuccess(response.data.message);

                setTimeout(() => {
                    navigate("/login");
                }, 1500);

            } else {

                setError(response.data.message);

            }

        } catch (err) {

            if (err.response && err.response.data) {

                setError(err.response.data.message);

            } else {

                setError("Unable to connect to server.");

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            <div className="row g-0 login-wrapper">

                {/* Left Panel */}

                <div className="col-lg-6 left-panel">

                    <div className="overlay">

                        <FaBuilding className="company-icon" />

                        <h1>Employee Management System</h1>

                        <p>Secure Employee Portal</p>

                        <div className="features">

                            <div>✔ Secure JWT Authentication</div>
                            <div>✔ Employee Dashboard</div>
                            <div>✔ Employee Management</div>
                            <div>✔ Search & Pagination</div>
                            <div>✔ Responsive Design</div>

                        </div>

                    </div>

                </div>

                {/* Right Panel */}

                <div className="col-lg-6 right-panel">

                    <div className="login-card">

                        <h2>Create Account</h2>

                        <p>Register to continue</p>

                        {error &&

                            <div className="alert alert-danger">
                                {error}
                            </div>

                        }

                        {success &&

                            <div className="alert alert-success">
                                {success}
                            </div>

                        }

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label>Username</label>

                                <div className="input-group">

                                    <span className="input-group-text">
                                        <FaUser />
                                    </span>

                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Enter Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            <div className="mb-4">

                                <label>Password</label>

                                <div className="input-group">

                                    <span className="input-group-text">
                                        <FaLock />
                                    </span>

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >

                                        {showPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />}

                                    </button>

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="btn btn-success w-100 login-btn"
                                disabled={loading}
                            >

                                {loading ? (

                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                        ></span>

                                        Registering...

                                    </>

                                ) : (

                                    "REGISTER"

                                )}

                            </button>

                        </form>

                        <div className="text-center mt-4">

                            <p>

                                Already have an account?

                                <Link
                                    to="/login"
                                    className="ms-2 text-decoration-none fw-bold"
                                >
                                    Login
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;