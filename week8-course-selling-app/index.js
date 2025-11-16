const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { UserModel, CourseModel } = require('./db');
const bcrypt = require('bcrypt');
const z = require('zod');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const courseRoutes = require('./routes/courses.routes')

require('dotenv').config();


const app = express();

app.use(express.json());



app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/course', courseRoutes )


function userAuth(req, res, next) {
    const token = req.headers.token;

    const data = jwt.verify(token, JWT_SECRET);

    if(data){
        req.headers.userId = data.userId;
        next()
    }
    res.status(401).json({
        message: "Invalid Token"
    })
}

//app.use(userAuth)


function adminAuth(req, res, next) {
    next();
}

app.use(adminAuth)



app.listen(process.env.PORT)