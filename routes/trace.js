var express = require('express');
var router = express.Router();
var XRay = require('aws-xray-sdk');
var http = require('http');
XRay.captureHTTPs(http);

router.get('/', function (req, res, next) {
    http.get("http://13.112.92.206", function (result) {
        res.status(200).end();
    });
});

module.exports = router;