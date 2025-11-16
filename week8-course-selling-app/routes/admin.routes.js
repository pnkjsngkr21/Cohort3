const express = require('express');
const {AdminModel} = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const z = require('zod');
const router = express.Router();



router.post("/signup", async function(req, res){
    const requiredBody = z.object({
        email: z.email(),
        name: z.string().min(3).max(100),
        password: z.string().min(8).max(25)
    })

    const safeParseData = requiredBody.safeParse(req.body);

    if(!safeParseData.success){
        res.status(400).json({
            errors: safeParseData.error
        })
        return
    }

    const {name, email, password} = req.body

    const existingUser = await AdminModel.findOne({
        email: email
    })

    if(existingUser){
        res.json({
            message : "Email id is already registered"
        })
        return
    }

    const hashedpassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    await AdminModel.create({
        name: name,
        email: email,
        password: hashedpassword
    })

    res.json({
        message: "Your are signed Up!"
    })

})

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const user = await AdminModel.findOne({
        email: email
    })

    if(!user){
        res.status(400).json({
            message: "Your are not registred."
        })
        return
    }

    const isMatch = bcrypt.compare(password, user.password);

    if(isMatch){
        const token = jwt.sign({
            userId: user._id.toString()
        }, process.env.JWT_SECRET);

        res.json({
            token: token
        })
    }else{
        res.json({
            message: "Credentials are invalid"
        })
    }

})

module.exports = router;