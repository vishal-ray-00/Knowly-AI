import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
 

app.get("/", (req, res) =>{
    res.json({ message: "Knowly AI backend is running!" })
})

app.get("/api/test",(req,res) =>{
    res.status(200).json({
        success:true
    })
})

export default app;