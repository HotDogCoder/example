const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Product.find()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});

router.post('/', (req, res, next) => {
    /*new product = {
        name: req.body.name,
        price: req.body.price
    }*/
    //console.log(req);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Handling POST/STORE request to /products',
            product: product
        })
    })
    .catch(error => {
        console.log(error);
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    var keys = Object.keys(req.body);
    for (let index = 0; index < keys.length; index++) {
        const element = keys[index];
        updateOps[element] = req.body[element];
    }
    console.log('body',req.body);
    console.log('updateOps',updateOps);
    Product.update(
        { _id: id },
        { $set: updateOps }
    )
    .exec()
    .then(result => {
        //console.log(result);
        //res.status(200).json(result);
        if(result.ok){
            if(result.ok == 1)
            {
                Product.findById(id)
                .then(result => {
                    //res.status(200).json(result);
                    let updated = result;
                    Product.find()
                    .then(
                        res.status(200).json({
                            updated: updated,
                            results: result
                        })
                    )
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err);
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                })
            }
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.remove({_id:id})
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;