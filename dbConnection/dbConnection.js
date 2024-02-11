require('dotenv').config();
const { Sequelize } = require('sequelize');
const config = require("../config/config");

const password = process.env.db_password ||config.database.password;
const username = process.env.db_userName ||config.database.username;
const database = process.env.db_name || config.database.database;
const host = process.env.db_host || config.database.host;
const dialect = process.env.dialect || config.database.dialect;
const port = process.env.db_port || config.database.port

const sequelize = new Sequelize(database,username, password, {
  host:host,
  dialect: dialect,
  port:port
});

const connection = async () => {

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};


module.exports={sequelize,connection};
