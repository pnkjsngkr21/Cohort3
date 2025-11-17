const jwt = require("jsonwebtoken");

const USER_JWT_SECRET = process.env.USER_JWT_SECRET;

function userAuth(req, res, next) {
    const token = req.headers.token;

    const data = jwt.verify(token, USER_JWT_SECRET);

    if(data){
        req.headers.userId = data.userId;
        next()
    }
    res.status(401).json({
        message: "Invalid Token"
    })
}

module.exports = userAuth;