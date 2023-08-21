const express = require('express');
const rigistrationMiddleware = require('../middlewares/rigistration.middleware');
const UserModel = require('../models/user.model');
const loginMiddleware = require('../middlewares/login.middleware');

const UserRouter = express.Router();

UserRouter.get('/', async (req, res) => {
    let users = await UserModel.find()
    res.send({ msg: 'Welcome From User Router', users })
});

UserRouter.post('/signup', rigistrationMiddleware, async (req, res) => {
    try {
        let newUser = new UserModel(req.body);
        await newUser.save();
        res.status(201).send({ msg: 'Registration Successful.' })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
});

UserRouter.post('/login', loginMiddleware, (req, res) => {
    try {
        res.status(200).send({ msg: 'Login Successful.', token: req.body.token })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
});


module.exports = UserRouter;