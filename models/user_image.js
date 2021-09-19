const mongoose = require("mongoose");

const user_image_Schema = new mongoose.Schema({
  image:{
    type:String,
    required:true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image_by: {
    type: String,
    required: true,
  },
  is_private: {
    type: String,
    required: true
  },
  cloudinary_id:{
    type:String,
    required:true
  },
  user_id:{
    type:String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const User_image_Model = mongoose.model("user_images", user_image_Schema);

module.exports = User_image_Model;
