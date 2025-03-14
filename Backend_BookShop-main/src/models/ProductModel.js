const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        rating: { type: Number, required: true },
        description: { type: String, required: true },
        author: { type: String, required: true },
        countInStock: { type: Number, required: true, default: 0, min: 0 }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;