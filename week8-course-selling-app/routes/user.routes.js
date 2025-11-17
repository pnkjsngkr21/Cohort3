const express = require('express');
const { UserModel } = require('../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const z = require('zod');
const userAuth = require('./../middleware/user')

const router = express.Router();


router.post("/signup", async function (req, res) {
    const requiredBody = z.object({
        email: z.email(),
        password: z.string().min(8).max(25),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100)
    })

    const safeParseData = requiredBody.safeParse(req.body);

    if (!safeParseData.success) {
        res.status(400).json({
            errors: safeParseData.error
        })
        return
    }

    const { firstName, lastName, email, password } = req.body

    const existingUser = await UserModel.findOne({
        email: email
    })

    if (existingUser) {
        res.json({
            message: "Email id is already registered"
        })
        return
    }

    const hashedpassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    await UserModel.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedpassword
    })

    res.json({
        message: "Your are signed Up!"
    })

})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({
        email: email
    })

    if (!user) {
        res.status(400).json({
            message: "Your are not registred."
        })
        return
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const token = jwt.sign({
            userId: user._id.toString()
        }, process.env.USER_JWT_SECRET);

        res.json({
            token: token
        })
    } else {
        res.json({
            message: "Credentials are invalid"
        })
    }

})


router.get("/purchases", userAuth, async (req, res) => {

    const userId = req.header.userId;

    const mycourses = await CourseModel.find({
        userId: new mongoose.Schema.ObjectId(userId)
    })

    res.json({
        courses: mycourses
    })

})

router.post("/purchase", userAuth, async (req, res) => {

})

router.get("/courses", userAuth, async (req, res) => {
    try {
        const courses = await CourseModel.find({})
        res.json(courses)
    } catch (err) {
        res.status(500).json({
            mesaage: err.mesaage
        })
    }
})

module.exports = router;