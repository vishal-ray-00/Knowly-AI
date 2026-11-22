import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute, GuestRoute } from "./components/RouteGuards";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
    return (
        <>
            <Toaster position="top-right" />
            <Routes>
                <Route
                    path="/login"
                    element={
                        <GuestRoute>
                            <AuthPage key="login" mode="login" />
                        </GuestRoute>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <GuestRoute>
                            <AuthPage key="signup" mode="signup" />
                        </GuestRoute>
                    }
                />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}