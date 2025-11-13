const express = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "ds54fshdjd44dsahd";

const app = express();

app.use(express.json());

const users = [];


app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/public/index.html");
})


app.post("/signup", (req, res) =>{

    const username = req.body.username;
    const password = req.body.password;

    if(users.find(user => user.username === username)){
        res.json({
            message : "Username is already registered."
        })
        return;
    }

    users.push({
        username : username,
        password : password
    })

    res.json({
        message : "You are sucessfully signed Up!."
    })

});


app.post("/signin", (req, res) =>{

    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password)

    if(user){
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);

        res.send({
            token
        })

    }else{

        res.status(401).send({
            message : "Invalid Credentials"
        })
    }
    
});

function auth(req, res, next){
    const token = req.headers.authorization;
    try{
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    }catch(err){
        res.status(401).json({
            message : "Invalid Token"
        })
    }
}

app.use(auth);

app.get("/me", (req, res) =>{

    const user = req.user;

    if(user){
        res.json({
            username : user.username
        })
    }else{
        res.json({
            message : "Invalid token."
        })
    }
})



app.listen(3000);