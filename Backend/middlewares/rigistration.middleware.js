const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = +process.env.saltRounds;

module.exports = async function rigistrationMiddleware(req, res, next) {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.send({ msg: 'Please Provide All Deatails, Keys Are Case Sensetive' });
        let isPresent = await UserModel.findOne({ email });
        if (isPresent) return res.send({ msg: 'User already Present Try LogIn.' })
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) return res.send({ msg: 'An Error Occure try Again.' });
            req.body.password = hash;
            next();
        })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
}