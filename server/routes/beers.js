const express = require('express');
const router = express.Router();
const axios = require('axios');
const Beer = require('../models/Beer');

const BEER_URL = 'http://api.brewerydb.com/v2/beer/random?key=332d59bd2c627aaafa2e2a734c6ed0a4';

router.route('/')
    .get((req, res) => {
        Beer.find({})
            .then(beers => res.send(beers))
            .catch(err => res.status(400).send(err))
    })
    .post((req, res) => {
    		axios.get(BEER_URL)
    			.then(r => {
    				req.body.name = r.data.data['name']
    				return Beer.create(req.body);
    			})
          .then(beers => res.send(beers))
          .catch(err => res.status(400).send(err))
    })
   

router.route('/:id')
    .get((req, res) => {
        Beer.findById(req.params.id)
            .then(beers => res.send(beers))
            .catch(err => res.status(400).send(err))
    })
    .delete((req, res) => {
        Beer.findByIdAndRemove(req.params.id)
            .then(beers => res.send())
            .catch(err => res.status(400).send(err))
    })
    .put((req, res) => {
        Beer.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })
            .then(beers => res.send(beers))
            .catch(err => res.status(400).send(err))
    })


module.exports = router;