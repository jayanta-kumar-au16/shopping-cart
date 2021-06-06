const express = require("express");
const router = express.Router();
const Address = require('../../models/Address');
const mongoose = require("mongoose");


router.get('/address',(req,res)=>{
    res.render('address',{layout: 'address'});
})


router.post('/address',async(req,res)=>{
   try {
        const user_id = req.user.id;
        const {name,phone,address,city,state,locationType} =req.body
        // console.log(req.body)
        const Addresses = await Address.find({ user_id });
        console.log(Addresses, "Addresses");
        if (Addresses.length == 0){
            const new_Address = new Address({
                user_id: user_id,
                addresses:[
                    {
                        name:name,
                        phone:phone,
                        address:address,
                        city:city,
                        state:state,
                        locationType:locationType
                    }
                ]
            });
        const save = await new_Address.save()
        console.log(save);
        }
        else{
            Addresses[0].addresses.push(
                {
                    name:name,
                    phone:phone,
                    address:address,
                    city:city,
                    state:state,
                    locationType:locationType
                }
            )
            const add_newAddress = await Address.findOneAndUpdate({ user_id }, Addresses[0]);
            const save = await add_newAddress.save();
        }
        res.redirect('/user/Home')
   } catch (error) {
        res.status(500).send(`Internal Error Occurred: ${error._message}`);
   }
})


module.exports = router;