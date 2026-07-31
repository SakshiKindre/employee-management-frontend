import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Navigate to="/login" />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>

                        <Dashboard />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/employees"
                element={
                    <ProtectedRoute>

                        <EmployeeList />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/employees/add"
                element={
                    <ProtectedRoute>

                        <AddEmployee />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/employees/edit/:id"
                element={
                    <ProtectedRoute>

                        <EditEmployee />

                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default App;