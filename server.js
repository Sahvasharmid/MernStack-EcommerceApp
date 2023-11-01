import express from "express"
import authrouter from "./routes/Authrouter.js"
import catrouter from "./routes/Catrouter.js"
import prodrouter from "./routes/Productrouter.js"
import { connectDB } from "./config/db.js";

import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv"
import cors from "cors"
dotenv.config();
connectDB();
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename);
const app=express()
app.use(express.json());
app.use(express.json( { extended: true} ));


app.use(express.static(path.join(__dirname,'./frontend/myapp/build')))
// Middleware to handle CORS
app.use(cors());
 
// Define your routes after setting up CORS headers

app.use("/", authrouter);
app.use("/",catrouter)
app.use("/",prodrouter)
app.use("*",function(req,res){
  res.sendFile(path.join(__dirname,"./frontend/myapp/build/index.html"))
  })

const PORT = process.env.PORT||3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
