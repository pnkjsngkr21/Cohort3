const express = require('express');
const { AdminModel, CourseModel } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const z = require('zod');
const adminAuth = require('./../middleware/admin');
const { default: mongoose } = require('mongoose');
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

    const existingUser = await AdminModel.findOne({
        email: email
    })

    if (existingUser) {
        res.json({
            message: "Email id is already registered"
        })
        return
    }

    const hashedpassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    await AdminModel.create({
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

    const user = await AdminModel.findOne({
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
        }, process.env.ADMIN_JWT_SECRET);

        res.json({
            token: token
        })
    } else {
        res.json({
            message: "Credentials are invalid"
        })
    }

})

router.post("/course", adminAuth, async (req, res) => {
    const { title, description, price, imageLink } = req.body;

    const course = await CourseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageLink,
        creatorId: req.headers.userId
    })

    res.json({
        message: "Course created successfully",
        courseId: course._id
    })
})

router.put("/course", adminAuth, async (req, res) => {
    const { title, description, price, imageLink, _id } = req.body;

    try {
        const course = await CourseModel.updateOne(
            {
                _id: _id,
                creatorId: req.headers.userId
            },
            {
                title: title,
                description: description,
                price: price,
                imageUrl: imageLink
            },
            {
                new: true,
                runValidators: true
            }
        )
        res.json({
            message: "Course updated successfully",
            courseId: _id
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

router.get("/course/bulk", async (req, res) => {
    try {
        const courses = await CourseModel.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router;