import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Only treat 401 as "session expired" if we actually had a token.
        // A wrong password on the login form also returns 401, and that
        // shouldn't trigger a logout.
        if (error.response?.status === 401 && localStorage.getItem("token")) {
            localStorage.removeItem("token");
            window.dispatchEvent(new Event("auth:logout"));
        }
        return Promise.reject(error);
    }
);

export default api;