//Criação de rotas de outro arquivo JS para mandar para a index
const express = require('express')
const router = express.Router()


router.get("/categories",(req,res)=>{
    res.send("ROTA CATEGORIAS")
})

router.get("/admin/categories/new",(req,res)=>{
    res.send("ROTA PARA CRIAR UMA NOVA CATEGORIA")
})

module.exports = router