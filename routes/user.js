const express = require("express");
const router=express.Router()
const {
  getAllUsers,
  userSignup,
  userLogin,
} = require("../controllers/user");

router.get("/", getAllUsers);

router.post("/signup",userSignup)

router.post("/login",userLogin)


module.exports=router