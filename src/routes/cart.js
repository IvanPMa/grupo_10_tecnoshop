const express = require ('express');
const router = express.Router();
const cartController = require ('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, cartController.index);

module.exports = router;