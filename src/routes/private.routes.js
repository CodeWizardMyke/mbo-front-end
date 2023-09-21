const express = require('express')
const router = express.Router();

const privateViewsController = require('../controllers/private.views.controller');

router.get('/', privateViewsController.profile)
router.get('/transactions', privateViewsController.transactions)

module.exports = router