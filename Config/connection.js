// To create the connection to localhost and sequelize 

const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
// Check if JAWSDB_URL environment variable is set (indicating JawsDB MySQL service on Heroku)
if (process.env.JAWSDB_URL) {

    // Initialize Sequelize with JawsDB URL
    
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
