const { Router } = require("express");
const { check } = require("express-validator");
const userController = require('../controllers/user.controller.js');
const jwtValidator = require("../middlewares/jwtValidator");
const checkFields = require("../middlewares/validateFields");

const router = Router();

// Create User (Ruta pública) - Registrar un nuevo usuario
router.post("/",
  [
    check("name").not().isEmpty().withMessage("Se requiere name de Usuario"),
    check("username").not().isEmpty().withMessage("Se requiere username de Usuario"),
    check("email").not().isEmpty().withMessage("Se requiere email de Usuario"),
    check("password").not().isEmpty().withMessage("Se requiere contraseña de Usuario"),
    check("gender").not().isEmpty().withMessage("Se requiere gender de Usuario"),
    check("profilePicture").optional(),
    check("coverPhoto").optional(),
    checkFields
  ],
  userController.createUser
);

// Get All Users (Ruta pública) - Obtener usuarios para la búsqueda
router.get("/", userController.getAllUsers);

// Forgot Password (Ruta pública) - Solicitar recuperación de contraseña
router.post("/forgot-password",
  [
    check("email").not().isEmpty().withMessage("Se requiere email de Usuario"),
    checkFields
  ],
  userController.forgotPassword
);

// Reset Password (Ruta pública) - Restablecer la contraseña usando el token
router.post("/reset-password",
  [
    check("token").not().isEmpty().withMessage("Se requiere token de Usuario"),
    check("newPassword").not().isEmpty().withMessage("Se requiere nueva contraseña de Usuario"),
    checkFields
  ],
  userController.resetPassword
);

// Get My User (Ruta protegida con JWT Token) - Obtener el perfil del usuario autenticado
router.get('/me', jwtValidator, userController.getMyUser);

// Delete User (Ruta protegida con JWT Token) - Eliminar la cuenta del usuario autenticado
router.delete('/me', jwtValidator, userController.deleteUser);

// Edit User (Ruta protegida con JWT Token) - Actualizar parcialmente el perfil del usuario autenticado
router.patch('/me', jwtValidator, userController.editUser);

// Get Favorites (Ruta protegida con JWT Token) - Obtener lista de publicaciones favoritas del usuario
router.get('/me/favorites', jwtValidator, userController.getFavorites);

// Get Following (Ruta protegida con JWT Token) - Obtener lista de usuarios seguidos
router.get('/me/following', jwtValidator, userController.getFollowing);

// Get Followers (Ruta protegida con JWT Token) - Obtener lista de usuarios seguidores
router.get('/me/followers', jwtValidator, userController.getFollowers);

// Search User (Ruta protegida con JWT Token) - Buscar el perfil de un usuario
router.post('/search',
  [
    jwtValidator,
    check("username").not().isEmpty().withMessage("Se requiere username de Usuario"),
    checkFields
  ],
  userController.searchUser);

// Get User (Ruta protegida con JWT Token) - Obtener perfil de un usuario
router.get('/:_id', jwtValidator, userController.getUser);

module.exports = router;
