const express = require("express");
require('dotenv').config();
const config = require("./config/config.js");
const {connection} = require("./dbConnection/dbConnection.js");
const globalError = require("./utilities/handelError/globalError.js");
const app = express();
app.use(express.json());




app.get("",(req,res)=>{

    console.log(req.url);
    res.json({
        message:"done"
    })
    
});

app.use("/v1/user",require("./routers/user/userRouter.js"));
    

connection();

app.use(globalError);


let port = process.env.port || config.database.port;



app.listen(port,()=>console.log(`server running at ${port}`));