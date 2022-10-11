const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;
require("dotenv").config();
const cors = require("cors");

app.use(cors({
    origin:"http://localhost:3000",
}))
app.use(express.json());
app.use("/api/v1",require("./src/v1/routes"));

//localhost:5000/api/v1/register

//db接続
try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("db接続中")
}catch(error){
    console.log(error)
}



app.listen(PORT, ()=> {
    console.log("ローカルサーバー起動中")
});