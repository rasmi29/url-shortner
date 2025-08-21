import express from 'express';
import urlRoute from "./routes/url.router.js"
import userRoute from "./routes/user.router.js"
import connectDb from './config/db.js';
import dotenv from "dotenv";

dotenv.config();

//create server
const app = express();

//body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//routing
app.use("/api/url",urlRoute);
app.use("/api/user",userRoute);

//database connection
connectDb();

//listening on port  
const PORT = 8000
app.listen(PORT,()=> console.log(`server started at port no ${PORT}`));