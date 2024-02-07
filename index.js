const express = require("express");
require('dotenv').config();
const env = require("./config/config.js");

const connection = require("./dbConnection/dbConnection.js");
const app = express();
app.use(express.json());



app.get("",(req,res)=>{

    console.log(req.url);
    res.json({
        message:"done"
    })
    
});



connection();


let port = process.env.db_port || env.port;

app.listen(port,()=>console.log(`server running at ${port}`));