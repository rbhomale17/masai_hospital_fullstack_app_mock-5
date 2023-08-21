const DoctorModel = require("../models/doctore.model");

module.exports = async function getDoctorsMiddleware(req, res, next) {
    const { filterBy, sortBy, searchBy } = req.query;
    try {
        if (!filterBy && !sortBy && !searchBy) {
            let doctors = await DoctorModel.find();
            req.query.doctors = doctors;
            next();
        } else if (!filterBy && !sortBy && searchBy) {
            let doctors = await DoctorModel.find({ name: { $regex: `${searchBy}`, $options: 'i' } })
            req.query.doctors = doctors;
            next();
        } else if (!filterBy && sortBy && !searchBy) {
            let doctors = await DoctorModel.find().sort({ date: sortBy })
            req.query.doctors = doctors;
            next();
        } else if (filterBy && !sortBy && !searchBy) {
            let doctors = await DoctorModel.find({ specialization: filterBy })
            req.query.doctors = doctors;
            next();
        } else if (!filterBy && sortBy && searchBy) {
            let doctors = await DoctorModel.find({ name: { $regex: `${searchBy}`, $options: 'i' } }).sort({ date: sortBy })
            req.query.doctors = doctors;
            next();
        } else if (filterBy && !sortBy && searchBy) {
            let doctors = await DoctorModel.find({ $and: [{ name: { $regex: `${searchBy}`, $options: 'i' } }, { specialization: `${filterBy}` }] })
            req.query.doctors = doctors;
            next();
        } else if (filterBy && sortBy && !searchBy) {
            let doctors = await DoctorModel.find({ specialization: filterBy }).sort({ date: sortBy })
            req.query.doctors = doctors;
            next();
        } else if (filterBy && sortBy && searchBy) {
            let doctors = await DoctorModel.find({ $and: [{ name: { $regex: `${searchBy}`, $options: 'i' } }, { specialization: `${filterBy}` }] }).sort({ date: sortBy })
            req.query.doctors = doctors;
            next();
        }

    } catch (error) {
        res.send({ err: error.message })
    }
}