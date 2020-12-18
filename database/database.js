const Sequelize = require("sequelize");

const connection = new Sequelize('guiapress','root','davi6259',{
    host:'localhost',
    dialect: 'mysql'
})

module.exports = connection;