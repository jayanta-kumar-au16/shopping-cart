const express = require("express");
const router = express.Router();
const user = require("../../models/user");
const cart = require("../../models/cart");
const Address = require('../../models/Address');
const mongoose = require("mongoose");

router.use(express.static('public'));

router.post('/checkout/payment/:amount',async(req,res)=>{
   try {
        const Amount = req.params.amount;
        const _id = req.user.id
        const user_id = req.user.id
        const Addresses = await Address.find({ user_id }).lean();
        console.log("Address=",Addresses)
        const add={}
        if(Addresses.length != 0){
            add.addresses=[]
            add.amount=Amount
            for(var i=0;Addresses[0].addresses.length >i;i++){
                add.addresses.push(Addresses[0].addresses[i])
            }
            console.log(add)
            res.render("payment", { layout:'payments', add });
            return res.status(200);
        }
        
        res.render("payment", { layout:'payments', Addresses });
   } catch (error) {
        res.status(500).send(`Internal Error Occurred: ${error._message}`);
   }
})

router.post('/checkedout/Successful/:amount',async(req,res)=>{
   try {
    const Amount = req.params.amount;
    const _id = req.user.id;
    const user_id = req.user.id;
    const User = await user.find({_id}).lean();
    const data = {amount:Amount , name:User[0].firstname}
    const delete_cart = await cart.deleteOne({user_id});
    console.log(data);
    res.render('checkout',{layout:'checkout' ,data})
   } 
   catch (error) {
    res.status(500).send(`Internal Error Occurred: ${error._message}`);
       
   }
})

module.exports = router;

