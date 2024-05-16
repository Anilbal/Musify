const express=require("express")
const { newCategory, getAllCategory } = require("../controller/categoryController")

const router=express.Router()

// new category
router.post('/newgenre',newCategory)

// get all category
router.get("/getallgenre",getAllCategory)
module.exports=router