//Criação de rotas de outro arquivo JS para mandar para a index
const express = require('express')
const router = express.Router()


router.get("/articles",(req,res)=>{
    res.send("ROTA articles")
})

router.get("/admin/articles/new",(req,res)=>{
    res.send("ROTA PARA CRIAR UMA NOVA articles")
})

module.exports = router