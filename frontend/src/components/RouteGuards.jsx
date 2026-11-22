import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Spinner() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-line border-t-accent" />
        </div>
    );
}

// Logged-in users only
export function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <Spinner />;
    return user ? children : <Navigate to="/login" replace />;
}

// Logged-out users only (login and signup pages)
export function GuestRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <Spinner />;
    return user ? <Navigate to="/" replace /> : children;
}