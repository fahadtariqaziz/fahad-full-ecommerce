const express = require ('express');
const {PORT} = require('./config/index');
const dbConnect = require('./database/index');
const router = require ('./routes/index');
const errorMiddleware = require('./middleware/error');

const cloudinary = require('cloudinary');
const {CLOUDINARY_NAME , CLOUDINARY_API_KEY ,CLOUDINARY_API_SECRET} = require('./config/index');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");

dotenv.config({ path : "backend/config/index"});
const {STRIPE_API_KEY , STRIPE_SECRET_KEY} = require("./config/index");

// Handling Uncaught Exception    server crash on purpose
process.on("uncaughtException" , (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);
    process.exit(1);
})

//console.log(youtube);

const app = express();

app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//after import body-parser and fileUpload
app.use(bodyParser.urlencoded({ extended: true}));
app.use(fileUpload());

//Route Imports
app.use("/api/v1",router);
const user = require("./routes/userRoute");
app.use("/api/v1",user);
const order = require("./routes/orderRoute");
app.use("/api/v1",order);

const payment = require("./routes/paymentRoute");
app.use("/api/v1",payment);

dbConnect();

//cloudinary import also for register user
cloudinary.config({    //isme ek object pass kare ge ye 3 object men or inki main website men signup free
    //cloud_name: process.env.CLOUDINARY_NAME,
    //api_key: process.env.CLOUDINARY_API_KEY,
    //api_secret: process.env.CLOUDINARY_API_SECRET
    //CLOUDINARY_NAME,
    //CLOUDINARY_API_KEY,
    //CLOUDINARY_API_SECRET,
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

//Middleware for Errors
app.use(errorMiddleware);

const server = app.listen(PORT, console.log(`Backend is running on port : ${PORT}`));




//unhandled promise rejection     server crash on purpose     like database String galat likh di tou jaldi se server ko close kardein   ab database men catch ki zarorat ni
process.on("unhandledRejection", err => {
    console.log(`Error : ${err.message}`);
    console.log(`shutting down the server due to unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    })
});