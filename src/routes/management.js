const express = require('express');
const router = express.Router();
const managementController = require ('../controllers/managementController');

router.get('/addProduct', managementController.add);
router.get('/editProduct', managementController.edit);

module.exports = router;