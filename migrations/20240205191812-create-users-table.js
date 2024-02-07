'use strict';


/* @type {import('sequelize-cli').Migration} */  
module.exports = {
  async up (queryInterface, Sequelize) {
    
     
      await queryInterface.createTable('users', { 
        id:{
          type:Sequelize.INTEGER, 
          allowNull:false,
          primaryKey:true,
          autoIncrement:false

        },
        name:{
         type:Sequelize.STRING,
         allowNull:false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password:{
          type:Sequelize.STRING,
          allowNull:false,
        },
        phone:{
          type:Sequelize.INTEGER,
          allowNull:false,
          unique:true
        },
        
        otp:{
          type:Sequelize.INTEGER,
           defaultValue:0
         
        },
        
        verified:{
         type:Sequelize.BOOLEAN,
         defaultValue:false,
        },
       createdAt: { 
         type: Sequelize.DATE,
         allowNull:false
       },
       updatedAt: { 
         type: Sequelize.DATE,
         allowNull:false
       }

      });
     
  },

  async down (queryInterface) {
    
     
      await queryInterface.dropTable('users');
     
  }
};
