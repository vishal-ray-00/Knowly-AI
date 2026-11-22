import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    // Only "loading" if there's a token to verify
    const [loading, setLoading] = useState(() =>
        Boolean(localStorage.getItem("token"))
    );

    useEffect(() => {
        const restoreSession = async () => {
            try {
                const { data } = await api.get("/auth/me");
                setUser(data.user);
            } catch {
                localStorage.removeItem("token");
            } finally {
                setLoading(false);
            }
        };

        if (localStorage.getItem("token")) {
            restoreSession();
        }

        const handleForcedLogout = () => setUser(null);
        window.addEventListener("auth:logout", handleForcedLogout);
        return () => window.removeEventListener("auth:logout", handleForcedLogout);
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", data.token);
        setUser(data.user);
    };

    const register = async (name, email, password) => {
        const { data } = await api.post("/auth/register", {
            name,
            email,
            password,
        });
        localStorage.setItem("token", data.token);
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);