const Category=require('../models/categoryModel')

// new category 
exports.newCategory=async(req,res)=>{
    let category=await Category.create({
        title:req.body.title
    })
    if(!category){
        return res.status(400).json({error:"Category not created"})
    }
    res.send(category)
}

// !get all songs
exports.getAllCategory=async(req,res)=>{
    const category=await Category.find()
    if(!category){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(category)
}