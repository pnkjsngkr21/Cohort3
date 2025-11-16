const express = require('express');
const router = express.Router();

router.post("/create", (req, res) => {



})

router.post("/delete", (req, res) => {

})

router.post("/update", (req, res) => {

})

app.post("/purchase", userAuth, (req, res) => {

})

app.get("/courses", userAuth, (req, res) => {

    const courses = CourseModel.find({})

    res.json({
        courses: courses
    })
})


module.exports = { router}