const DoctorModel = require("../models/doctore.model");

module.exports = async function createAppointmentMiddleware(req, res, next) {
    const { name, image, specialization, experience, location, slots, fee } = req.body;
    try {
        if (!name || !image || !specialization ||
            !experience || !location || !fee || !slots) return res.send({ msg: "Please Preovide All Details, Keys Are Case Sensetive" });
        let date = new Date().toISOString();
        req.body.date = date;
        let appointment = new DoctorModel(req.body);
        await appointment.save();
        next();
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
}