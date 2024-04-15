
// llamar sqlize
const { Sequelize } = require("sequelize");
//dotenv
require("dotenv").config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

// Crear una instancia de Sequelize
const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  {
    host: dbHost,
    dialect: "postgres",

  }
);

//prueba de conexion a la bd



module.exports = sequelize;



