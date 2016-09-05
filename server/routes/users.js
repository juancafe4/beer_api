const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', (req, res) => {
  User.register(req.body, err => {
    res.status(err ? 400 : 200).send(err);
  });
});

router.post('/login', (req, res) => {
  User.authenticate(req.body, (err, token) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.cookie('authtoken', token).send();
    }
  });
});

router.get('/profile', User.authMiddleware, (req, res) => {
  res.send(req.user);
});


router.post('/logout', (req, res) => {
  res.clearCookie('authtoken').send();
});

router.route('/')
    .get((req, res) => {
        User.find({})
            .then(users => res.send(users))
            .catch(err => res.status(400).send(err))
    })
    .post((req, res) => {
        User.create(req.body)
            .then(users => res.send(users))
            .catch(err => res.status(400).send(err))
    })

router.route('/:id')
    .get((req, res) => {
        User.findById(req.params.id)
            .then(users => res.send(users))
            .catch(err => res.status(400).send(err))
    })
    .delete((req, res) => {
        User.findByIdAndRemove(req.params.id)
            .then(users => res.send())
            .catch(err => res.status(400).send(err))
    })
    .put((req, res) => {
        User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })
            .then(users => res.send(users))
            .catch(err => res.status(400).send(err))
    })





module.exports = router;
