require('dotenv').config();
const config= require("../../config/config")


const globalError=(err,req,res,next)=>
{
    if (err) 
    {
        if(process.env.NODE_ENV=="development")
        {
        err.statusCode=err.statusCode || 500
        res.status(err.statusCode).json({ message:err.message, status:err.statusCode, stack:err.stack})
        }else
        {
        err.statusCode=err.statusCode || 500
        res.status(err.statusCode).json({message:err.message,state:err.statusCode })

        }
    }
}

module.exports=globalError