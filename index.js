const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require("express-session")
//Importando banco de dados
const Article = require('./articles/Article')
const Category = require('./categories/Category')
const User = require('./user/User')
//rotas router
const categoriesController = require('./categories/CategoriesController')
const articlescontroller= require('./articles/ArticlesController')
const usercontroller= require('./user/UserController')


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

//sessions
app.use(session({
    secret:"adfsddfbdfbdfbdbfxfgdfbgffgndfbdfbdf",
    //tempo em milisegundos
    cookie:{maxAge:3000}
}))
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
app.use("/",usercontroller)

app.get('/',(req,res)=>{
    Article.findAll({
        raw:true,
        order:[['id','DESC']],
        limit:4
    }).then(articles =>{
        Category.findAll().then(categories=>{
            res.render('index',{articles:articles,categories:categories})
        })
    })
    
})

app.get("/:slug",(req,res)=>{
    var slug = req.params.slug
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories=>{
                res.render("article",{article:article,categories:categories})
            })
        }else{
            res.redirect("/")
        }
    }).catch(err =>{
        res.redirect("/")
    })
})

app.get("/category/:slug",(req,res)=>{
    var slug = req.params.slug
    Category.findOne({
        where:{slug:slug},
        include:[{model:Article}]
    }).then(category =>{
        if (category != undefined) {
            Category.findAll().then(categories =>{
                res.render("index",{articles:category.articles,categories:categories})
            })
        } else {
            res.redirect("/")
        }
    }).catch(err =>{
        res.redirect("/")
    })
})

app.listen(8080,()=>{
    console.log("Server ligado")
})