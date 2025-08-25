//const express = require('express') //this the old way
import express from "express";
import cookieParser from "cookie-parser";//if we won't use this then basically if we send any data from the frontend side, the browser cookies are stored in the tokens{only stored but bot parsered}
import cors from "cors"; //CORS: Cross-Origin Resource Sharing{it's a security feature built into web browsers that controls which domains are allowed to access resources on a web server }
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
dotenv.config({}); //calling an empty object

const app = express(); //calling the function


//middleware{requesting,responsing of the data in the json format }
app.use(express.json()); //we are passing the json file
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',  //frontend we will use is react
    credentials:true
    }
  app.use(cors(corsOptions));



const PORT = process.env.PORT || 3000; 

//api's
app.use("/api/v1/user", userRoute); 
app.use("/api/v1/company", companyRoute); 
app.use("/api/v1/job", jobRoute);  
app.use("/api/v1/application", applicationRoute); 

//"http://localhost:8000/api/v1/user/register" //the api adds from here
//"http://localhost:8000/api/v1/user/login"
//"http://localhost:8000/api/v1/user/profile/update"

app.listen(PORT,()=>{ //call back function
     connectDB();
     console.log(`Server running at port ${PORT}`);
     
})
