var express = require('express');
var router = express.Router();
//var XRay = require('aws-xray-sdk');
var http = require('http');
// _http = XRay.captureHTTPs(http);

router.get('/', function (req, res, next) {
    console.log(http.get);

    var options = {
        hostname: "13.112.92.206",
        path: '/',
        port: 80,
        method: "GET"
    };

    var req = http.request(options, function (result) {
        console.log(result);
        result.on('data', function (data) {
            console.log(data);
        });

        result.on('end', function () {
            res.status(200).end();
        });
    });

    req.end();
});

module.exports = router;