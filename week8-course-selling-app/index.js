const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const courseRoutes = require('./routes/courses.routes')

require('dotenv').config();


const app = express();

app.use(express.json());



app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/course', courseRoutes )




//app.use(userAuth)


function adminAuth(req, res, next) {
    next();
}

app.use(adminAuth)


async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(process.env.PORT)    
}

main();

