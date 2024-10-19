const { Router } = require("express");
const { check } = require("express-validator");
const userController = require('../controllers/user.controller.js');
const jwtValidator = require("../middlewares/jwtValidator");
const checkFields = require("../middlewares/validateFields");

const router = Router();

// Rutas públicas

// Create User
router.post("/",
  [
    check("username").not().isEmpty().withMessage("Se requiere username de Usuario"),
    check("email").not().isEmpty().withMessage("Se requiere email de Usuario"),
    check("password").not().isEmpty().withMessage("Se requiere contraseña de Usuario"),
    checkFields,
  ],
  userController.createUser
);

// Login User
router.post("/login",
  [
    check("email").not().isEmpty().withMessage("Se requiere email de Usuario"),
    check("password").not().isEmpty().withMessage("Se requiere contraseña de Usuario"),
    checkFields,
  ],
  userController.loginUser
);

// Rutas protegidas por JWT Token

// Logout User
router.post("/logout", jwtValidator, userController.logoutUser);

// Update User
router.put("/:id", jwtValidator, userController.updateUser);

// Edit User
router.patch("/:id", jwtValidator, userController.editUser);

// Delete User
router.delete("/:id", jwtValidator, userController.deleteUser);

// Get User by ID
router.get("/:id", jwtValidator, userController.getUserById);

module.exports = router;
