import Sequelize from "sequelize";
import dotenv from "dotenv";
// import mysql from 'mysql2/promise';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);



export default sequelize;
