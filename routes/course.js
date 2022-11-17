const createError = require('http-errors');
const express = require('express');
const { User, Course } = require('../models');
const { checkAuth } = require('./auth');

const router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    let courses = await Course.findAll()
    res.status(200).json(courses)
  }
  catch (error) {
    next(error)
  }
})

router.get('/:id', async function(req, res, next) {
  let courseId = req.params.id
  try {
    let course = await Course.findOne({
      where: { id: courseId },
      include: User,
    })
    if (course) {
      res.status(200).json(course)
    }
    else {
      next(createError(404, "Could not find any course with this id"))
    }
  }
  catch (error) {
    next(error)
  }
})

router.post('/', checkAuth, async function(req, res, next) {
  try {
    await Course.create(req.body)
    res.status(201).header('Location' , '/').send()
  }
  catch (error) {
    res.status(400).json(error.errors)
  }
})

router.put('/:id', checkAuth, async function(req, res, next) {
  let courseId = req.params.id
  try {
    let course = await Course.findOne({ where: { id: courseId }})
    if (course) {
      try {
        await course.update(req.body)
        res.status(204).send()
      } catch (error) {
        res.status(400).json(error.errors)
      }
    }
    else {
      next(createError(404, "Could not find any courses with this id"))
    }
  }
  catch (error) {
    next(error)
  }
})

router.delete('/:id', checkAuth, async function(req, res, next) {
  let courseId = req.params.id
  try {
    let course = await Course.findOne({ where: { id: courseId }})
    if (course) {
      await course.destroy()
      res.status(204).send()
    }
    else {
      next(createError(404, "Could not find any courses with this id"))
    }
  }
  catch (error) {
    next(error)
  }
})

module.exports = router;
