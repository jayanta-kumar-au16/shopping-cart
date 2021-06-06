const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    user_id: {
        type: Object,
        required: true,
    },
    addresses:{
        type: Array,
        required: true,
    }
});

const addressmodel = mongoose.model("address", addressSchema);

module.exports = addressmodel; 