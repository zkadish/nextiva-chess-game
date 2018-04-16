const express = require('express');
const router = express.Router();
const model = require('../controllers/User');


router.route('/signup')
  .post(model.signUpUser);

router.route('/signin')
  .post(model.signInUser);


module.exports = router;