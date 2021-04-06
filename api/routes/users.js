const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    User.find()
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err,
            msg: 'error al traer usuarios'
        });
    })
});


router.post('/', (req, res, next) => {
    /*new user = {
        name: req.body.name,
        price: req.body.price
    }*/
    //console.log(req);
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password,
        dni: req.body.dni,
        agree: req.body.agree
    });
    user.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Handling POST/STORE request to /users',
            user: user
        })
    })
    .catch(error => {
        console.log(error);
    });
});

module.exports = router;