const express = require('express')
const app = express()
const bodyParser = require('body-parser')

//rotas router
const categoriesController = require('./categories/CategoriesController')
const articlescontroller= require('./articles/ArticlesController')

//database connection
const connection = require('./database/database')

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com sucesso!")
    }).catch((error)=>{
        console.log(error)
    })



//view engine
app.set('view engine','ejs')

//static
app.use(express.static('public'))

//bodyparser - Para manipulação de formulario e json
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//Se caso eu adicionar um prefixo para essa rota a rota so sera acessivel apartir desse prefixo. Caso contrario o acesso a pagina será negado
// ex: app.use('/prefixo',categoriesController) 
// A rota categoria so será acessada a partir do prefixo... ("/prefixo/xxxx")
app.use('/',categoriesController)
app.use('/',articlescontroller)

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(8080,()=>{
    console.log("Server ligado")
})