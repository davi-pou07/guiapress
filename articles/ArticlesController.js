//Criação de rotas de outro arquivo JS para mandar para a index
const express = require('express')
const router = express.Router()
const Category = require('../categories/Category')
const Article = require('./Article')
const slugify = require("slugify")
const { Router } = require('express')

router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{ model: Category }]
    }).then(article => {
        res.render("admin/articles/index", { article: article })
    })

})

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories: categories })
    })

})

router.post("/articles/save", (req, res) => {
    var title = req.body.title
    var body = req.body.body
    var category = req.body.category

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles")
    })
})

//deletando categoria

router.post("/articles/delete", (req, res) => {
    var id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: { id: id }
            }).then(() => {
                res.redirect("/admin/articles")
            })
        } else {
            res.redirect("/admin/articles")
        }
    } else {
        res.redirect("/admin/articles")
    }
})

router.get("/articles/edit/:id", (req, res) => {
    var id = req.params.id
    if (isNaN(id)) {
        res.redirect("/admin/articles")
    }
    Category.findAll().then(categories => {
        Article.findByPk(id).then(article => {
            if (article != undefined) {
                res.render("admin/articles/edit", { article: article, categories:categories })
            } else {
                res.redirect("/admin/articles")
            }
        }).catch(err => {
            res.redirect("/admin/articles")
        })
    })
})

router.post("/articles/update",(req,res)=>{
    id = req.body.id
    var title = req.body.title
    var body = req.body.body
    var category = req.body.category
    Article.update({title:title,body:body,category:category,slug: slugify(title)},{
        where:{id:id}
    }).then(()=>{
        res.redirect("/admin/articles")
    })
})
module.exports = router

