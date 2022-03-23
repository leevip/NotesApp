var express = require('express');
const { body } = require('express-validator');
var router = express.Router();

router.get('/notes', function(req, res, next) {
    console.log('Get /notes');
});

router.post('/note', body("content").notEmpty(), body("topic").notEmpty(), function(req, res, next) {
    console.log(req.body.topic + "/n" + req.body.content);
})


module.exports = router;