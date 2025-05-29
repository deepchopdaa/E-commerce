const mongoose = require("mongoose")
const CartSchma = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    items:[
        {
            qty:{
                type:Number,
                require:true    
            },
            product_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product"
            }
        }
    ]
}, { timestamps: true, versionKey: false })

const cart = mongoose.model("cart", CartSchma);
module.exports = cart