const express = require("express");
const mongoose = require('mongoose');
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const z = require("zod");

const saltRounds = 5;
const JWT_SECRET = "s3cret";

const app = express();

app.use(express.json())

mongoose.connect('');


app.post("/signup", async function (req, res) {
    const requiredBody = z.object({
        email: z.email(),
        name: z.string().min(3).max(100),
        password: z.string().min(8).max(25)
    })

    //const parseData = requiredBody.parse(req.body);
    const safeParseData = requiredBody.safeParse(req.body);

    if(!safeParseData.success){
        res.status(400).json({
            errors: safeParseData.error
        })
    }

    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
        res.status(400).json({
            message: "User already exists"
        });
        return;
    }

    const hashpassord = await bcrypt.hash(password, saltRounds)

    await UserModel.create({
        name: name,
        email: email,
        password: hashpassord,
    })

    res.json({
        message: "You are sign Up!"
    })
})


app.post("/login", async function (req, res) {
    const { email, password } = req.body;

    const response = await UserModel.findOne({
        email: email
    });

    const passwordMatch = bcrypt.compare(password, response.password);

    if (passwordMatch) {
        const token = jwt.sign({
            userId: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Credentials are invalid"
        })
    }
})

async function auth(req, res, next) {
    const token = req.headers.authorization;

    const payload = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findOne({
        _id: payload.userId
    })
    if (user) {
        req.userId = user._id
        next();
    } else {
        res.status(401).json({
            message: "Token is invalid"
        })
    }
}

app.use(auth);

app.post("/todo", async function (req, res) {
    const { title, done } = req.body;
    const userId = req.userId;

    await TodoModel.create({
        title: title,
        done: done,
        userId: userId
    })

    res.json({
        message: "Success"
    })
})

app.get("/todos", async function (req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId: userId
    });

    res.json(todos);

})

app.listen(3000);

