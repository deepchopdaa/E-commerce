require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const protect = async (req, res, next) => {
    console.log("middleare called")
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(400).send("Token Not Found !")
    console.log(token)
    let decord = jwt.verify(token, "secretkey");
    req.user =await User.findById(decord.id)
    console.log(req.user)
    if (!req.user) {
        console.log("User Not Found !");
        return res.status(400).send("User Not Found !")
    }
    return next();
}

module.exports = protect