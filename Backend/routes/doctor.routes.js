const express = require('express');
const DoctorModel = require('../models/doctore.model');
const createAppointmentMiddleware = require('../middlewares/createAppointment.middleware');
const getDoctorsMiddleware = require('../middlewares/getDoctors.middleware');
const DoctorRouter = express.Router();

DoctorRouter.get('/', async (req, res) => {
    try {
        let doctors = await DoctorModel.find();
        res.send({ msg: 'Welcome To Doctor Router', doctors })
    } catch (error) {
        res.send({ err: error.message })
    }
});


DoctorRouter.post('/appointments', createAppointmentMiddleware, (req, res) => {
    res.status(201).send({ msg: 'Appointment Created successfully.' })
});

DoctorRouter.get('/get', getDoctorsMiddleware, (req, res) => {
    try {
        let { doctors } = req.query;
        res.send({ doctors })
    } catch (error) {
        res.send({ err: error.message })
    }
});

DoctorRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) return res.send({ msg: "Please Provide ID" });
        let isPresent = await DoctorModel.findById(id);
        if (!isPresent) return res.send({ msg: "Appointment Not Found" });
        await DoctorModel.findByIdAndDelete(id);
        res.send({ msg: 'Appointment Deleted Successfully' })
    } catch (error) {
        res.send({ err: error.message })
    }
});

DoctorRouter.patch('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) return res.send({ msg: "please Provide ID" })
        let isPresent = await DoctorModel.findById(id);
        if (!isPresent) return res.send({ msg: "Appointment Not Found" });
        let date = new Date().toISOString();
        req.body.date = date;
        await DoctorModel.findByIdAndUpdate(id, req.body);
        res.send({ msg: "Appointment Updated Successfully." })
    } catch (error) {
        res.send({ err: error.message })
    }
})

module.exports = DoctorRouter;