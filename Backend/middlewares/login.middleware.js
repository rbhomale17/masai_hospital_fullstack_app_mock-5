const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.secretKey;

module.exports = async function loginMiddleware(req, res, next) {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.send({ msg: 'Please Provide All Correct Deatails, Keys Are Case Sensetive' });
        let isPresent = await UserModel.findOne({ email });
        if (!isPresent) return res.send({ msg: "User Not Exist!" });
        bcrypt.compare(password, isPresent.password, (err, result) => {
            if (!result) return res.send({ msg: 'Invalid Credentials' });
            isPresent.password = null;
            let token = jwt.sign({ userData: isPresent }, secretKey, { expiresIn: '2h' });
            req.body.token = token;
            next();
        })

    } catch (error) {
        res.status(400).send({ err: error.message })
    }
}