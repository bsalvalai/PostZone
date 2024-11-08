const { Router } = require("express");
const adController = require('../controllers/ad.controller.js');

const router = Router();

// Get Ads (Ruta pública) - Obtener lista de propagandas precargadas del mes actual
router.get("/", adController.getAds);

module.exports = router;
