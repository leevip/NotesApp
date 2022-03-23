var express = require('express');
const { body } = require('express-validator');
var router = express.Router();
const Note = require('../models/Note');
const {v4: uuidv4} = require('uuid');


router.get('/notes', function(req, res, next) {
    console.log('Get /notes');
    Note.find({}, (err, notes) => {
        if (err) {
            res.json({error: "Database error"});
        } else {
            res.json(notes);
        }
    })
});
router.get('/notes/:topic', function(req, res, next) {
    console.log('Get /notes');
    Note.find({topic: req.params.topic}, (err, notes) => {
        if (err) {
            res.json({error: "Database error"});
        }
        res.json(notes);
    })
});

router.post('/note', body("content").notEmpty(), body("topic").notEmpty(), function(req, res, next) {
    console.log('POST /note');
    Note.create({
        note_id: uuidv4(),
        topic: req.body.topic,
        note_name: req.body.name,
        content: req.body.content,
        time: req.body.time
    },
    (err, ok) => {
        if(err) {
            res.json({error: "Error while creating note"});
        } else {
            return res.json(ok);
        }
    })
});


module.exports = router;