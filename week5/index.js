const express = require("express");

const app = express();

let requestCount = 0;


function logger(req, res, next){
    const message = {
        timeStamp : new Date(),
        httpMethod : req.method,
        url : req.url
    }
    console.log(message);
    next();
}

app.use(logger);

app.get("/admin", function(req, res){
    res.json({
        requestCount : requestCount
    })
})

function requestCounter(req, res, next){
    requestCount++;
    console.log("Number of requests: "+requestCount);
    next();
}

app.use(requestCounter);




app.get("/sum", function(req, res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        answer: a+b
    })
});

app.get("/multiply", function(req, res){
    const a = req.query.a;
    const b = req.query.b;

    res.json({
        answer: a*b
    })


});

app.get("/subtract", function(req, res){
        const a = req.query.a;
    const b = req.query.b;

    res.json({
        answer: a - b
    })

});

app.get("/divide", function(req, res){
        const a = req.query.a;
    const b = req.query.b;

    res.json({
        answer: a/b
    })

});

app.listen(3000);

