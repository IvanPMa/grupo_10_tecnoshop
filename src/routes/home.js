const express = require('express');
const router = express.Router();
const homeController = require ('../controllers/homeController');
const darkModeMiddleware = require('../middlewares/darkModeMiddleware');

router.get('/', homeController.index);
router.get('/darkmode/:darkmode', darkModeMiddleware, homeController.darkMode); // Ruta para guardar el modo oscuro

module.exports = router;