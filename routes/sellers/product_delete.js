const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const addProduct = require("../../models/add_product");

router.post('/delete/:category/:id',async(req,res)=>{
    const _id =  req.params.Id;
    const category = req.params.category
    try {
        const get_product = await addProduct.deleteOne(_id );
            res.redirect('/seller/update')
    } catch (error) {
        res.status(500).send(`Internal Error Occurred: ${error._message}`); 
    }

})

module.exports = router;