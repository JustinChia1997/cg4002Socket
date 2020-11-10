//IGNORE THIS, THIS FILE IS USELESS
// IGNORE
// IGNORE
// IGNORE
// IGNORE
// IGNORE
// IGNORE
// IGNORE
// IGNORE
// IGNORE
// IGNORE

const router = require('express').Router();

let danceMove = require('../models/dancemove.model');

router.route('/').get((req,res) => {
    danceMove.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ` + err));
});


router.route('/add').post((req,res) => {
    const danceMoveName = req.body.moveName;

    const newDanceMove = new danceMove({
        danceMoveName
    });

    newDanceMove.save()
        .then(() => res.json('dance move added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;