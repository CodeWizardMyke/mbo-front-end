const express = require('express')
const router = express.Router();

const privateViewsController = require('../controllers/private.views.controller');

router.get('/', privateViewsController.profile)

module.exports = router