const router = require('express').Router()
const userRoutes = require('./userRoutes')
const blogRoutes = require('./blogRoutes')
const connection = require('../../config/connection')

router.use('/users', userRoutes)
router.use('/blogs', blogRoutes)

module.exports = router
