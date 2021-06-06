const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const addProduct = require("../../models/add_product");


// router.get('/all_Products',async(req,res)=>{
//     const get_allproduct = await addProduct.find({}).lean()
//     res.render("user_Products", { layout: "all_products", get_allproduct })
// })

router.get('/Home_Essentials',async(req,res)=>{
   try {
        const get_allproduct = await addProduct.find({category:"Home_Essentials"}).lean()
        res.render("user_Products", { layout: "all_products", get_allproduct })
   } catch (error) {
        res.status(500).send(`Internal Error Occurred: ${error._message}`);
   }
})

router.get('/Grocery',async(req,res)=>{
    try {
        const get_allproduct = await addProduct.find({category:"Grocery"}).lean()
        res.render("user_Products", { layout: "all_products", get_allproduct })
    } catch (error) {
        res.status(500).send(`Internal Error Occurred: ${error._message}`);
    }
})

router.get('/Electronics',async(req,res)=>{
    try {
        const get_allproduct = await addProduct.find({category:"Electronics"}).lean()
        res.render("user_Products", { layout: "all_products", get_allproduct })
    } catch (error) {
        res.status(500).send(`Internal Error Occurred: ${error._message}`);
    }
})

module.exports = router;