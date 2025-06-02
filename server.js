require('./config/db.js')
require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

app.use("/uploads", express.static('uploads'))
/* Routes */
const UserRoute = require("./routes/user.route.js");
const User = require('./model/user.model.js');
app.use("/user", UserRoute)

const Category = require("./routes/category.routes.js")
app.use("/category", Category)

const product = require("./routes/product.route.js")
app.use('/product', product)

const cart = require("./routes/Cart.route.js")
app.use("/cart",cart)

const order = require("./routes/Order.routes.js")
app.use("/order",order)

app.listen(PORT, () => {
    console.log(`App is running On ${PORT} !`)
})