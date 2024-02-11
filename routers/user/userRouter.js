const  jwt  = require("jsonwebtoken");
const User =require("../../models/userModel");
const AppError = require("../../utilities/handelError/appErrorClass");
const asyncHandler = require("../../utilities/handelError/asyncHandler");
const validation = require("../../utilities/validation/validation");
const { signupSchema, signinSchema } = require("./userValidation");
const bcrypt = require("bcryptjs");



const userRouter=require("express").Router();

/* -------------------------------------------------------------------------- */
/*                                   SignUp                                 */
/* -------------------------------------------------------------------------- */

userRouter.post('/signup',validation(signupSchema),asyncHandler(async(req,res,next)=>{

    const user = User.build(req.body);
    
    let email = user.getEmail();
    let phone = user.getPhone();

    const findUser = await User.findOne({where:{email}});

    if (findUser) {
        
        return next(new AppError('the email is already registered',400));
    }

    let checkPhone = await User.findOne({where:{phone}});

    if(checkPhone){

        return next(new AppError("this phone numper is already used"))
    };

    const hashed = bcrypt.hashSync(req.body.password, parseInt(process.env.salt));
    user.password = hashed;

    await user.save();
    res.status(200).json({message:"done",user});

    }));


    /* -------------------------------------------------------------------------- */
    /*                                   SignIn                                   */
    /* -------------------------------------------------------------------------- */



userRouter.post("/signin" ,validation(signinSchema) ,

asyncHandler(async (req,res,next) => {

    let user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {

        return next(new AppError("you need to register first", 401));

    }
        let password = bcrypt.compareSync(req.body.password, user.password)

        if (!password) {

            return next(new AppError("the password is incorrect", 400))

        } 
            let token = jwt.sign({ email: user.email, id: user.ID }, process.env.token_key);
            res.status(200).json({ message: "done", user, token });
        
        }));

  /* -------------------------------------------------------------------------- */
  /*                               change password                              */
  /* -------------------------------------------------------------------------- */

  userRouter.put("/changepassword" ,validation(changePasswordSchema),authMiddleware(accepted.all) ,

asyncHandler(async(req,res,next)=>{
    
    let user = await userModel.findOne({where:{ID:req.user.ID}});
    let checkPassword = bcrypt.compareSync(req.body.password , user.password);
    if (!checkPassword) return next(new AppError("incorrect password" ,401));
    const hashed = bcrypt.hashSync(req.body.new_password, parseInt(process.env.salt));

     user.password =hashed;
     await user.save()
    res.status(201).json({message:"done",user})    


}) );

  // get all users_______

  userRouter.get('',

  asyncHandler(async(req,res,next)=>{
  
  
      const users = await userModel.findAll();
  
      res.status(200).json({messaage:"done",users})
  }));
  
  // get specific user
  
  
  userRouter.get('/:ID',
  
  asyncHandler(async(req,res,next)=>{
  
      let {ID} = req.params;
      const user = await userModel.findOne({where:{ID}});
  
      res.status(200).json({messaage:"done",user})
  }));
  
        
    
    

        
userRouter.get("/",asyncHandler(async(req,res,next)=>{

    const users= await User.findAll();

    res.json(users  )
}))    



module.exports=userRouter; 
