//Criação de rotas de outro arquivo JS para mandar para a index
const express = require('express')
const Category = require('./Category')
const router = express.Router()


//carregando slugify
const slugify = require('slugify')

router.get('/admin/categories/new',(req,res)=>{
    res.render("admin/categories/new")
})

router.post('/categories/save',(req,res)=>{
    var title = req.body.title
    if(title != undefined){
        Category.create({
            title:title,
            slug: slugify(title) //Computação em informatica = computação-em-informatica
        }).then(()=>{
            res.redirect("/")
        })
    }else{
        res.redirect("/admin/categories/new")
    }
})

router.get('/admin/categories',(req,res)=>{
    Category.findAll().then(categories =>{
        res.render('admin/categories/index',{
            categories: categories
        })
    })
})

module.exports = router