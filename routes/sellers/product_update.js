const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const addProduct = require("../../models/add_product")

router.use(express.static("public"));

router.get("/update",(req,res)=>{
    res.render('seller_ProductUpdate',{layout:'update'})
})

router.get("/update/:category/:id",async(req,res)=>{
    const _id = {_id: req.params.id};
    const category = req.params.category;
    try{
        const get_product = await addProduct.findOne(_id).lean();
            res.render('updateForm',{layout:'form', get_product})
    }catch (error) {
        res.status(500).send(`Internal Error Occurred: ${error._message}`); 
    }
});


router.post("/update/:category/:Id",async(req,res)=>{
    const _id = {_id: req.params.Id};
    const category = req.params.category
    try {
        const get_product = await addProduct.findOneAndUpdate(_id , req.body );
            const save = await get_product.save()
            res.redirect('/seller/update')

    } catch (error) {
        res.status(500).send(`Internal Error Occurred: ${error._message}`); 
    }
})

module.exports = router;