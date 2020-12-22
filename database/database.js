const Sequelize = require("sequelize");

const connection = new Sequelize('guiapress','root','davi6259',{
    host:'localhost',
    dialect: 'mysql',
    //configurando timezone
    timezone: "-03:00"
})

module.exports = connection;