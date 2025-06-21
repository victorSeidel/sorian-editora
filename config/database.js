require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize
(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    pool: 
    {
      max: 5, 
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;