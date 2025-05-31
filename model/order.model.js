const mongoose = require("mongoose");
const Product = require("./product.model");
const OderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    orderItems: [{
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        Product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true
        }
    }],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    status:{
        type:String,
        enum:["Pendding","Confirm","Shipped","Delivered","Cancel","Returned"],
        default:'Pendding'
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
        default: Date.now
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },

}, { timestamps: true, versionKey: false })

const order = mongoose.model("order", OderSchema);
module.exports = order