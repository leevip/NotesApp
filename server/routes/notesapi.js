const { ok } = require('assert');
const e = require('express');
var express = require('express');
const { body } = require('express-validator');
var router = express.Router();
const fs = require('fs');
const xml2js = require('xml2js');

var notes;

var parser = new xml2js.Parser();

fs.readFile('./database/db.xml', 'utf-8', (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
        parser.parseString(data, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                console.log("Data read");
                console.dir(result);
                notes = result;
            }
        })
    }
})

router.get('/notes', function(req, res, next) {
    console.log('Get /notes');
    console.log(notes)
    if(!notes) {
        res.json({message: 'No notes available'});
    } else {
        res.send({message: "Notes"});
    }
});

router.post('/note', body("content").notEmpty(), body("topic").notEmpty(), function(req, res, next) {
    console.log('POST /note');
    console.log(req.body.topic + "\n" + req.body.content);
    res.json(req.body);
})


module.exports = router;