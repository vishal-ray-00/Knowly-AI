import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
 

app.get("/", (req, res) =>{
    res.json({ message: "Knowly AI backend is running!" })
})

import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);


export default app;