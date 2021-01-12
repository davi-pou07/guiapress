const express = require("express")
const router = express.Router()
const User = require("./User")
//npm install --save bcryptjs
const bcrypt = require("bcryptjs")


router.get("/admin/users", (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", { users: users })
    })
})

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create")
})
router.post("/users/create", (req, res) => {
    var email = req.body.email
    var password = req.body.password
    User.findOne({ where: { email: email } }).then(user => {
        if (user == undefined) {
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt)
            // res.json({email,password}) //Modo de teste pra vê se ta chegando
            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/")
            }).catch(err => {
                res.redirect("/")
            })
        } else {
            res.redirect("/admin/users/create")
        }
    })
})

router.post("/user/delete", (req, res) => {
    id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            User.destroy({
                where: { id: id }
            }).then(() => {
                res.redirect("/admin/users")
            })
        } else {
            res.redirect("/admin/users")
        }
    } else {
        res.redirect("/admin/users")
    }

})

router.get("/admin/users/edit/:id", (req, res) => {
    var id = req.params.id
    if (!isNaN(id)) {
        if (id != undefined) {
            User.findByPk(id).then(users => {
                res.render("admin/users/edit", { users: users })
            })
        } else {
            res.redirect("/admin/users")
        }
    } else {
        res.redirect("/admin/users")
    }

})
router.post("/users/update", (req, res) => {
    var id = req.body.id
    var email = req.body.email
    var password = req.body.password
    User.update({ email: email, password: password },{
        where: { id: id }
    }).then(()=>{
        res.redirect("/admin/users")
    })
})


// User.sync({force:true})
module.exports = router