const express = require('express')
const router = express.Router();

const privateViewsController = require('../controllers/private.views.controller');

router.get('/', privateViewsController.dashboard)
router.get('/profile', privateViewsController.profile)

router.get('/transactions', privateViewsController.transactions)
router.get('/transaction/:id', privateViewsController.transaction_item)

router.get('/categorys', privateViewsController.categorys_list)
router.get('/category/:id', privateViewsController.category_item)

module.exports = router