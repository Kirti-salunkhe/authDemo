const express = require("express");
const router = express.Router();
const validateToken=require("../middlewares/auth")

router.get("/",validateToken,(req,res)=>{
    res.render("home", { user: req.user, messages: req.flash("error") });
})

router.get("/signup", (req, res) => {
  res.render("signup", { messages: req.flash("error") });
});

router.get("/login", (req, res) => {
  res.render("login", { messages: req.flash("error") });
});

module.exports=router