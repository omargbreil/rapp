const {Sequelize , DataTypes, Model} = require("sequelize");
const {sequelize} = require("../dbConnection/dbConnection");
const generateId = require("../utilities/generateId");


class User extends Model {


  getEmail(){

      return this.email

  };
  getPhone(){

    return this.phone
  };
  
  otherPublicField;
}

 User.init({

    id:{
        type:DataTypes.STRING, 
        allowNull:false,
        primaryKey:true,
        autoIncrement:false,
        defaultValue:generateId()

      },
      name:{
       type:DataTypes.STRING,
       allowNull:false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      phone:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
      },
      
      otp:{
        type:DataTypes.INTEGER,
         defaultValue:0
       
      },
      location: {
        type:DataTypes.JSONB({
          city: DataTypes.STRING,
          street: DataTypes.STRING,
          place: DataTypes.STRING,
          floor: DataTypes.INTEGER,
          address: DataTypes.TEXT,
          lat: DataTypes.FLOAT,
          lng: DataTypes.FLOAT  
        }),
        defaultValue: {},
      },
      
      verified:{
       type:DataTypes.BOOLEAN,
       defaultValue:false,
      },
     createdAt: { 
       type: DataTypes.DATE,
       allowNull:false
     },
     updatedAt: { 
       type: DataTypes.DATE,
       allowNull:false
     }

},{
  sequelize,
  modelName:'user'
});


(async () => {
  try {
    await User.sync();
    console.log('users table created successfully.');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
})();


module.exports=User