require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

module.exports={
  development: {
    username:process.env.db_userName,
    password:process.env.db_password,
    database:process.env.db_name,
    host:process.env.db_host,
    port: process.env.db_port,
    dialect:"postgres",
    migrationStorageTableName:"migrations",
  },
  test:{
    username:process.env.db_userName,
    password:process.env.db_password,
    database:process.env.db_name,
    host:process.env.db_host,
    port: process.env.db_port,
    dialect:"postgres",
    migrationStorageTableName:"migrations"
  },
  production:{
    username:process.env.db_userName,
    password:process.env.db_password,
    database:process.env.db_name,
    host:process.env.db_host,
    port: process.env.db_port,
    dialect:"postgres",
    migrationStorageTableName:"migrations"
  }
}[env]

