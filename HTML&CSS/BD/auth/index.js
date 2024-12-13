const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./Routes/Auth");
const userRoute = require("./Routes/User");

dotenv.config();
 const app = express();
 const port = process.env.PORT || 5000;


 app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/user', userRoute);



 mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useFindAndModify: false,
    useCreateIndex: true,
 }).then(
    ()=>console.log("mongodb connected")
 ).catch((err)=>console.log(err));


 app.listen(port, ()=>console.log(`Server is running on ${port}`));