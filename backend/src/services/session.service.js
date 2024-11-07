const Session = require('../models/Session');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class sessionService {

  // BORRAR
  async getAllSessions() {
    try {
      return await Session.find({});
    } catch (err) {
      console.error("Error en el Servicio getAllSessions: ", err);
      throw new Error("Error en el Servicio getAllSessions: " + err.message);
    }
  }

  async login({ email, password }) {
    try {
      let user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        console.error("El email y/o la contraseña son incorrectos");
        throw new Error("El email y/o la contraseña son incorrectos");
      }

      let payload = {
        user: {
          _id: user._id,
          username: user.username,
          email: user.email
        }
      };

      let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

      let decodedToken = jwt.decode(token);  // Extraigo la fecha de expiración del token, 'exp' ya está en segundos
      let tokenExpiration = decodedToken.exp - Math.floor(Date.now() / 1000);  // Calculo cuántos segundos tarda en expirar el token

      let existingSession = await Session.findOne({ user: user._id });  // Verifico si ya existe una sesión para este usuario
      if (existingSession) {
        existingSession.jwt = token;  // Si existe, actualizo el token y la expiración sin crear una nueva sesión
        existingSession.secondsUntilTokenExpiration = tokenExpiration;
        await existingSession.save();
      } else {
        let session = new Session({  // Si no existe, creo una nueva sesión
          jwt: token,
          user: user._id,
          secondsUntilTokenExpiration: tokenExpiration
        });
        await session.save();
      }

      return { token, tokenExpiration, userId: user._id, username: user.username, email: user.email };
    } catch (err) {
      console.error("Error en el Servicio login: ", err);
      throw new Error("Error en el Servicio login: " + err.message);
    }
  }

  async logout(token) {
    try {
      // Elimino la sesión asociada al token
      let session = await Session.findOneAndDelete({ jwt: token });
      if (!session) {
        throw new Error("Sesión no encontrada");
      }
    } catch (err) {
      console.error("Error en el Servicio logout: ", err);
      throw new Error("Error en el Servicio logout: " + err.message);
    }
  }

  async refreshToken(oldToken) {
    try {
      const decoded = jwt.verify(oldToken, process.env.JWT_SECRET);
      const user = await User.findById(decoded.user._id);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      const newPayload = {
        user: {
          _id: user._id,
          username: user.username,
          email: user.email
        }
      };
      const newToken = jwt.sign(newPayload, process.env.JWT_SECRET, { expiresIn: '30d' });

      // Actualizo la sesión con el nuevo token
      const session = await Session.findOneAndUpdate({ jwt: oldToken }, { jwt: newToken }, { new: true });

      if (!session) {
        throw new Error("Sesión no encontrada para actualizar el token");
      }

      let decodedToken = jwt.decode(newToken);  // Extraigo la fecha de expiración del token, 'exp' ya está en segundos
      let tokenExpiration = decodedToken.exp - Math.floor(Date.now() / 1000);  // Calculo cuántos segundos tarda en expirar el token

      session.secondsUntilTokenExpiration = tokenExpiration;
      await session.save();

      return { newToken, tokenExpiration, userId: user._id, username: user.username, email: user.email };
    } catch (err) {
      console.error("Error en el Servicio refreshToken: ", err);
      throw new Error("Error en el Servicio refreshToken: " + err.message);
    }
  }

}

module.exports = new sessionService();