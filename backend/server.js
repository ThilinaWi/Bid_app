const dotenv = require("dotenv");
dotenv.config(); 

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());

app.use(
    cors({
        origin: ["http://localhost:3000", "your website domain  url"],
        credentials: true,
    })
);

const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("Home pages");
});

mongoose
.connect(process.env.DATABASE_CLOUD)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});


