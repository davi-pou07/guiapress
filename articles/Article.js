//MODEL DE Artigo

const Sequelize = require("sequelize")
const connection = require("../database/database")

const Article =  connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
        //Slug é o nome editavel que sairia o titulo para ultilizar na rota por exemplo
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports= Article