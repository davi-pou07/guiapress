const { STRING } = require("sequelize")
//MODEL DE CATEGORIAS

const Sequelize = require("sequelize")
const connection = require("../database/database")

const Category =  connection.define('categories',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
        //Slug é o nome editavel que sairia o titulo para ultilizar na rota por exemplo
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


//Arquivo foi removido para não tentar criar toda vez que o projeto rodar
// Category.sync({force:true})

module.exports= Category