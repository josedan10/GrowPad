const express = require('express')
const router = express.Router()
const sitesController = require('../controllers/sitesController')

router.get('/', sitesController.getAll)
router.post('/newSite', sitesController.newSite)

module.exports = router
