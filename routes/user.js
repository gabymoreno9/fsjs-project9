const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { checkAuth } = require('./auth');

const router = express.Router();

router.get('/', checkAuth, async function(req, res, next) {
  try {
    res.status(200).json(req.user)
  }
  catch (error) {
    next(error)
  }
})

router.post('/', async function(req, res, next) {
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 8);
    }
    await User.create(req.body)
    res.status(201).header('Location' , '/').send()
  }
  catch (error) {
    res.status(400).json(error.errors)
  }
})

module.exports = router;
