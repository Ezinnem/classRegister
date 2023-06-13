const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

//MIDDLEWARE

app.use(cors());
app.use(express.json())

//ROUTES


app.listen(2000, ()=>{
    console.log("Server is running on port 2000")
})