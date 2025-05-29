require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(400).send("Token Not Found !")
    let decord = jwt.verify(token, process.env.JWT_SECRET);
    req.user = User.findById(decord._id)
    if (!req.user) {
        console.log("User Not Found !");
        return res.status(400).send("User Not Found !")
    }
    return next();
}

module.exports = protect