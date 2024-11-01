require("dotenv").config();
const jwt = require('jsonwebtoken');

const jwtValidator = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Autorización denegada por falta de token JWT' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ message: 'El Token no es válido' });
  }
};

module.exports = jwtValidator;
