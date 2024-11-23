const { Router } = require("express");
const { check } = require("express-validator");
const sessionController = require('../controllers/session.controller.js');
const jwtValidator = require("../middlewares/jwtValidator");
const checkFields = require("../middlewares/validateFields");

const router = Router();

// Login (Ruta pública) - Iniciar sesión
router.post('/',
  [
    check("email").not().isEmpty().withMessage("Se requiere email de Usuario"),
    check("password").not().isEmpty().withMessage("Se requiere contraseña de Usuario"),
    checkFields
  ],
  sessionController.login
);

// Logout (Ruta protegida con JWT Token) - Cerrar sesión
router.delete('/', jwtValidator, sessionController.logout);

// Refresh Token (Ruta protegida con JWT Token) - Refrescar el token
router.put('/', jwtValidator, sessionController.refreshToken);

module.exports = router;
