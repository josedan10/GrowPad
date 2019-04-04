const express = require('express')
const router = express.Router()

router.use('/scraper', require('./scraper'))
router.use('/sites', require('./sites'))

module.exports = router
