import "dotenv/config";
import app from "./app.js";
import connectDB from "./db/database.js";

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error.message);
        process.exit(1);
    });

    