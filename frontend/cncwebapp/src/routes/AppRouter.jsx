import { createBrowserRouter, Navigate } from "react-router-dom"
import { Dashboard } from "../pages/Dashboard/Dashboard"
import { Pacientes } from "../pages/Pacientes/Pacientes"
import { LoginPage } from "../pages/LoginPage/LoginPage"
import { RegisterPage } from "../pages/RegisterPage/RegisterPage"
import { HomePage } from "../pages/HomePage/HomePage"
import App from "../App"
import ProtectedRoute from "./ProtectedRoute"
import { useAuth } from "../context/useAuth"

const PublicRoute = ({ children }) =>
{
    const { isLoggedIn } = useAuth();
    return isLoggedIn() ? <Navigate to="/" replace /> : children;
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "login",
                element:
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
            },
            { path: "register", element: <RegisterPage /> },
            {
                path: "",
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
                children: [
                    { path: "", element: < HomePage /> },
                    { path: "pacientes", element: <Pacientes /> },
                ]
            },
        ]
    }
])