require("dotenv").config();
const User = require("../model/user.model.js")
const Nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const RegisterUser = async (req, res) => {
    try {
        console.log("User Register Api called");
        console.log(req.body)
        const { name, email, password, isAdmin } = req.body;
        let userFind = await User.findOne({ email: email })
        console.log(userFind, "User Find !")
        if (!userFind) {
            const hashpassword = await bcrypt.hash(password, 10);
            console.log(hashpassword)
            let newUser = await User.create({ name, email, password: hashpassword, isAdmin })
            console.log(newUser, "User Created !")
            if (newUser) {
                const transporter = Nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    service: 'gmail',
                    port: 465,
                    secure: false, // true for port 465, false for other ports
                    auth: {
                        user: 'deepchopda01@gmail.com',
                        pass: 'zhjh waof srgk nqxa'
                    },
                });
                async function main() {
                    // send mail with defined transport object
                    const info = await transporter.sendMail({
                        from: '"Deep Chopda" <deepchopda01@gmail.com>', // sender address
                        to: `${req.body.email}`, // list of receivers
                        subject: "Register", // Subject line
                        text: "Request Submit", // plain text body
                        html: `<h2>${req.body.email} is Register Sucessfully</h2>`
                    });
                    console.log("Message sent: %s", info.messageId);
                    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
                }
                main().catch(console.error);
            }
            return res.status(201).send(newUser);
        } else {
            return res.status(400).send("User Already Exits !")
        }
    } catch (e) {
        console.log("Register Error", e)
        return res.status(500).send("User Register Error", e)
    }
}

const LoginUser = async (req, res) => {
    try {
        console.log("User Login Api called")
        console.log(req.body);
        const { email, password } = req.body;
        const FindUser = await User.findOne({ email: email })
        console.log(FindUser)
        if (!FindUser) {
            console.log("User Not Found !")
            return res.status(404).send("User Not Found Please Register First!")
        }
        const id = FindUser._id
        const Checkpassword = FindUser.password
        console.log("sffgsfg")
        const match = await bcrypt.compare(password, Checkpassword)
        console.log(match, " password match ! ")
        if (!match) {
            console.log("Password is Mismatch");
            return res.status(300).send("Password Not Match !")
        }
        console.log(FindUser._id)
        let token = jwt.sign({ id: FindUser._id }, "secretkey", { expiresIn: "1d" })
        return res.status(201).send({ "token": token })
    } catch (e) {
        console.log("Login Error", e)
        return res.status(500).send("User Login Error", e)
    }
}

const UpdateUser = async (req, res) => {
    try {
        console.log("Update User Api called");
        console.log(req.body, "Update User Playload");
        let { name, email, password } = req.body;
        let id = req.params.id;
        let user = await User.findById(id);
        if (!user) {
            console.log("User Not Found !")
            return res.status(400).send("User Not Found !");
        }
        let data = await User.findByIdAndUpdate(id, { name: name, email: email, password: password }, { new: true })
        console.log(data);
        return res.status(201).send(data);
    } catch (e) {
        console.log("Update User Error", e);
        return res.status(500).send("Server Error", e)
    }
}

module.exports = { RegisterUser, LoginUser, UpdateUser }