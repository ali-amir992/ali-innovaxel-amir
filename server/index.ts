import 'module-alias/register';
import { Request,Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import urlRoutes from "@routes/URL"
import { dbConnect } from "@config/dbConnect";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
dbConnect();

app.use("/api/v1" , urlRoutes);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req: Request, res: Response) => {
    res.send("hello World!!");
  });