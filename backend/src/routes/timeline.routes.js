const { Router } = require("express");
const timelineController = require('../controllers/timeline.controller.js');
const jwtValidator = require("../middlewares/jwtValidator");

const router = Router();

// Obtener el Timeline (Ruta protegida con JWT Token)
router.get('/', jwtValidator, timelineController.timeline);

module.exports = router;
