const mongoose = require("mongoose");

const product_model = mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
        minlength: 50,
        maxlength: 500,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    seller_id: {
        type: Object,
        required: true,
    },
});

const add_product = mongoose.model("add_product", product_model);

module.exports = add_product;
