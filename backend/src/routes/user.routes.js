const { Router } = require("express");
const { check } = require("express-validator");
const userController = require('../controllers/user.controller.js');
const jwtValidator = require("../middlewares/jwtValidator");
const checkFields = require("../middlewares/validateFields");

const router = Router();

// --- Rutas públicas ---

// Create User - Registrar un nuevo usuario
router.post("/",
  [
    check("name").not().isEmpty().withMessage("Se requiere name de Usuario"),
    check("username").not().isEmpty().withMessage("Se requiere username de Usuario"),
    check("email").not().isEmpty().withMessage("Se requiere email de Usuario"),
    check("password").not().isEmpty().withMessage("Se requiere contraseña de Usuario"),
    checkFields
  ],
  userController.createUser
);

// Get Users - Obtener usuarios para la búsqueda
router.get("/", userController.getUsers);

// Forgot Password - Solicitar recuperación de contraseña
router.post("/forgot-password", userController.forgotPassword);

// --- Rutas protegidas por JWT Token ---

// Reset Password - Restablecer la contraseña usando el token
router.post("/reset-password", userController.resetPassword);

// Edit User - Actualizar parcialmente mi perfil
router.patch('/me', jwtValidator, userController.editUser);

// Delete User - Eliminar mi cuenta
router.delete('/me', jwtValidator, userController.deleteUser);

// Get User - Obtener el perfil del usuario autenticado
router.get('/me', jwtValidator, userController.getUser);

module.exports = router;
