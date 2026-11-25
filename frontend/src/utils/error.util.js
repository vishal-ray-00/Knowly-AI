// Turns any error into a message that is safe to show the user
export const getErrorMessage = (error, fallback = "Something went wrong") => {
    if (error?.response?.data?.message) return error.response.data.message;
    if (error?.code === "ERR_NETWORK") {
        return "Could not reach the server. Check your connection.";
    }
    if (error?.response) return fallback;
    return error?.message || fallback;
};