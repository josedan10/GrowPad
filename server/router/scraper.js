const express = require('express')
const router = express.Router()

const scraperControllers = require('../controllers/scraperController')

router.get('/startScrap', scraperControllers.startScrap)

module.exports = router
