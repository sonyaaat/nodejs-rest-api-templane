const express = require('express')
const authMiddleWare=require("../../middlewares/auth")
const router = express.Router()
const ctrlWrapper=require("../../middlewares/ctrlWrapper")
const {auth:authOperations}=require("../../controllers/index")
router.post("/register",ctrlWrapper(authOperations.register))
router.post("/login",ctrlWrapper(authOperations.login))
router.post("/logout",authMiddleWare,ctrlWrapper(authOperations.logout))

module.exports=router