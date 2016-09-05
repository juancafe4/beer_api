const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'vofibnortnboirtnboritnreipgjep';

let validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const userSchema = new mongoose.Schema({
  name:{type:String},
  image:{type:String},
  email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: { type: String, required: true },
  beers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Beer'}]
});

userSchema.statics.register = function(userObj, cb) {
  this.findOne({email: userObj.email}, (err, dbUser) => {
    if(err) return cb(err);
    if(dbUser) return cb({error: 'email already taken.'});

    bcrypt.genSalt(11, (err, salt) => {
      if(err) return cb(err);
      bcrypt.hash(userObj.password, salt, null, (err, hash) => {
        if(err) return cb(err);

        userObj.password = hash;

        this.create(userObj, (err, newUser) => {
          cb(err);
        });
      });
    });
  });
};

userSchema.statics.authenticate = function(userObj, cb) {
  let { email, password } = userObj;

  this.findOne({ email }, (err, dbUser) => {
    if(err || !dbUser) {
      return cb(err || {error: 'Login failed.  email or password incorrect.'});
    }

    bcrypt.compare(password, dbUser.password, (err, isGood) => {
      if(err) return cb(err);
      if(!isGood) return cb({error: 'Login failed.  email or password incorrect.'});

      let payload = {
        _id: dbUser._id
      }

      jwt.sign(payload, JWT_SECRET, {}, cb);
    })
  });
};

userSchema.statics.authMiddleware = function(req, res, next) {
  let token = req.cookies.authtoken;
  console.log('I am here');
  jwt.verify(token, JWT_SECRET, (err, payload) => {

    if(err) return res.status(401).send(err);

    mongoose.model('User')
    .findById(payload._id)
    .select('-password')
    .exec((err, user) => {
      if(err) return res.status(400).send(err);
      if(!user) return res.status(401).send({error: 'User not found.'})

      req.user = user;
      next();
    })
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
