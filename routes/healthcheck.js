var express = require('express');
var router = express.Router();

router.get('/healthcheck', function (req, res, next) {
    res.status(200);
});

module.exports = router;