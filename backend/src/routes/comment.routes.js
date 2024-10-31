const { Router } = require("express");
const { check } = require("express-validator");
const userController = require('../controllers/user.controller.js');
const jwtValidator = require("../middlewares/jwtValidator");
const checkFields = require("../middlewares/validateFields");

const router = Router();

module.exports = router;
