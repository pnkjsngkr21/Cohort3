const jwt = require("jsonwebtoken");


function adminAuth(req, res, next) {
    const token = req.headers.authorization;

    const data = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    if (data) {
        req.headers.userId = data.userId;
        next()
    } else {
        res.status(401).json({
            message: "Invalid Token"
        })
    }

}

module.exports = adminAuth;