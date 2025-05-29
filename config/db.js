const mongoose = require("mongoose");

const main = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");
        console.log("MongoDb Connected !")
    } catch (e) {
        return console.log("Mongodb Connection Error", e);
    }
}
main(); 

module.exports = main