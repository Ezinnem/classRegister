const express = require("express");
const app = express();
const cors = require("cors")

//MIDDLEWARE

app.use(cors());
app.use(express.json())

app.listen(2000, ()=>{
    console.log("Server is running on port 2000")
})