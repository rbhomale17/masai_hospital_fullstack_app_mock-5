const express = require('express');
const CORS = require('cors');
const connection = require('./Backend/config/db');
const UserRouter = require('./Backend/routes/user.router');
const DoctorRouter = require('./Backend/routes/doctor.routes');
require('dotenv').config();
const port = +process.env.port || 3000;
const app = express();
app.use(express.json());
app.use(CORS());

app.get('/', (req, res) => {
    res.send({
        msg: 'Welcome To Masai Hospital (FullStack) App.',
        Student_name: 'Rushikesh Bhomale',
        Student_code: 'fw25_348'
    })
});

app.use('/user', UserRouter);
app.use('/doctor', DoctorRouter)

app.listen(port, async () => {
    try {
        await connection;
        console.log('Connected To DB')
    } catch (error) {
        console.log(error.message);
        console.log('Failed To Connect DB')
    }
    console.log('Server Running On http://localhost:3000')
})