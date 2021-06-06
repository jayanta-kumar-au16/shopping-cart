const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user_id: {
        type: Object,
        required: true,
    },
    products:{
        type: Array
    }
});

const cartmodel = mongoose.model("cart", cartSchema);

module.exports = cartmodel; 
