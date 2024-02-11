const jwt=require("jsonwebtoken");
const asyncHandler = require("../handelError/asyncHandler");
const AppError = require("../handelError/appErrorClass");
const User = require("../../models/userModel");



 module.exports.accepted =
{
    admin:"admin",
    owner:"owner",
    customer:"customer",
    user:["customer","owner"],
    all:["admin","customer","owner"]
    
}
module.exports.authMiddleware=(roles)=>
{
   return asyncHandler(async(req,res,next)=>

 
    {
    let token = req.headers.token;
    if (!token) return next(new AppError("token not provided"));
    let decoded = jwt.verify(token ,process.env.token_key);
    console.log(decoded);

    
    let user = await User.findOne({where:{id:decoded.id}});

    console.log(user);
    if (!user)return next(new AppError("user not found" ,401));




    req.user=user.dataValues;

    
    if (!roles.includes(user.role)) 
    {
        next(new AppError("not authorize" ,401))    
    }
   
    
    next()
    
    

})

    

}