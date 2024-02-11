const joi = require('joi');


/* -------------------------------------------------------------------------- */
/*                                   SignUp                                   */
/* -------------------------------------------------------------------------- */
module.exports.signupSchema = {

body:joi.object({
    name: joi.string().error(new Error('Name must be a string'))
        .alphanum().error(new Error(' Name can only contain alphabets and numbers'))
        .min(3).error(new Error(' Name should have at least 3  characters'))
        .max(30).error(new Error('  Name cannot exceed 30 characters '))
        .required().error(new Error('Name is required')),

    password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).error(new Error('  Password format is incorrect ')),

    // repeat_password: joi.ref('password'),

    // access_token: [
    //     joi.string(),
    //     joi.number()
    // ],

    phone:joi.string().
    pattern(new RegExp('^[0-9]{11}$')).error(new Error('Phone number should contain exactly 11 digits '))
    .required(),    

    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
        
    location: joi.object({
              city: joi.string().required(),
              street: joi.string().required(),
              place: joi.string().required(),
              floor: joi.number().integer().required(),
              address: joi.string().required(),
              lat: joi.number().required(),
              lng: joi.number().required()
          }).required(),


})

}


/* -------------------------------------------------------------------------- */
/*                                   SignIn                                   */
/* -------------------------------------------------------------------------- */
module.exports.signinSchema = {

body:joi.object({

        

    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
   

    password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).error(new Error('  Password format is incorrect ')),


    // access_token: [
    //     joi.string(),
    //     joi.number()
    // ],


})

};

/* -------------------------------------------------------------------------- */
/*                            changePasswordSchema                            */
/* -------------------------------------------------------------------------- */
module.exports.changePasswordSchema = {

body:joi.object({


    password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
    new_password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
    confirm_password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))


    // access_token: [
    //     joi.string(),
    //     joi.number()
    // ],


})

}