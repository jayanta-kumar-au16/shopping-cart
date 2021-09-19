const express = require('express');
const router = express.Router();
const ImageModel = require('../models/user_image');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');


router.post("/image/:id", upload.single("image"), async (req, res) => {
    const _id =  req.params.id;
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const imageData = new ImageModel({
        image:result.secure_url,
        title:req.body.title,
        description:req.body.description,
        image_by:req.body.image_by,
        is_private:req.body.is_private,
        cloudinary_id:result.public_id,
        user_id:_id
      })
      console.log("after")
      const saveData = await imageData.save();
      res.json({saveData}).status(200);
    } catch (err) {
        res.status(500).send(`Internal Error Occurred: ${err._message}`);
}}); 

router.get('/Allimage',async(req,res)=>{
    try {
        const getAllImage = await ImageModel.find()
        res.json({getAllImage}).status(200);
    } catch (err) {
        res.status(500).send(`Internal Error Occurred: ${err._message}`);
    }
})

router.get('/privateimage/:is_private',async(req,res)=>{
    const response = req.params.is_private;
    try {
        if(response === "yes"){
            const getPrivateImage = await ImageModel.find({respone});
            res.json({getPrivateImage}).status(200);
        }else{
            res.json({msg:"Finding for only private images"})
        }
        
    } catch (error) {
        res.status(500).send(`Internal Error Occurred: ${error._message}`);
    }
})

router.put('image/:id',upload.single("image"), async(req,res)=>{
    const uid = { user_id: req.params.id };
    try {
        let user = await ImageModel.findById({uid});
        await cloudinary.uploader.destroy(user.cloudinary_id);
        const result = await cloudinary.uploader.upload(req.file.path);
        const updatedData = new ImageModel({
            image:result.secure_url,
            title:req.body.title,
            description:req.body.description,
            image_by:req.body.image_by,
            is_private:req.body.is_private,
            cloudinary_id:result.public_id,
            user_id:uid
        })
        user = await ImageModel.findByIdAndUpdate(uid , updatedData)
        await user.save()
        res.json({user}).status(200);
    } catch (error) {
        res.status(500).send(`Internal Error Occurred: ${error._message}`);
    }
})

router.delete("/deleteimage/:id", async (req, res) => {
    const id = {user_id:req.params.id}
    try {
      // Find user by id
      let user = await ImageModel.findById({id});
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(user.cloudinary_id);
      // Delete user from db
      await user.remove();
      res.json(user);
    } catch (err) {
      console.log(err);
    }});


module.exports = router;