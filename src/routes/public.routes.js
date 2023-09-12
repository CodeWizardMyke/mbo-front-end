const express = require('express');
const router = express.Router();

const publicViewsController = require('../controllers/public.views.controller');

router.get('/', publicViewsController.index);
router.get('/singin', publicViewsController.singin);

module.exports = router;
