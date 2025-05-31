const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    stoke: {
        type: Number,
        required: true,
        default: 0
    },
    image: [{
        type: String,
        required: true
    }],
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            rating: Number,
            comment: String,
            createdAt: { type: Date, default: Date.now }
        }
    ],
}, {
    timeStamps: true,
    versionKey: false
})

const Product = mongoose.model("product", ProductSchema);
module.exports = Product