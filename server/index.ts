import 'module-alias/register';
import express from 'express';
import dotenv from 'dotenv';
import { dbConnect } from "@config/dbConnect";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
dbConnect();




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/" , ()=>{

});