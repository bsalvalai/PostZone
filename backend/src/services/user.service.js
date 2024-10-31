const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class userService {

  async createUser({ name, username, email, password, gender, profilePicture, coverPhoto }) {
    try {
      let isUserRegistered = await User.findOne({ email: email });
      if (isUserRegistered) {
        console.error("El usuario ya está registrado");
        throw new Error("El usuario ya está registrado");
      }

      let hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        username,
        email,
        password: hashedPassword,
        gender,
        profilePicture,
        coverPhoto
      });

      await user.save();
      return user;
    } catch (err) {
      console.error("Error en el Servicio createUser: ", err);
      throw new Error("Error en el Servicio createUser: " + err.message);
    }
  }

  async getAllUsers() {
    try {
      return await User.find({});
    } catch (err) {
      console.error("Error en el Servicio getAllUsers: ", err);
      throw new Error("Error en el Servicio getAllUsers: " + err.message);
    }
  }

  async loginUser({ email, password }) {
    try {
      let user = await User.findOne({email: email});
      if (!user || !(await bcrypt.compare(password, user.password))) {
        console.error("El email y/o la contraseña son incorrectos");
        throw new Error("El email y/o la contraseña son incorrectos");
      }

      let payload = {
        user: {
          _id: user._id,
          username: user.name,
          email: user.email
        }
      };
      let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });  // Revisar expiración
  
      return { token: token, id: user._id, username: user.username, mail: user.email };
    } catch (err) {
      console.error("Error en el Servicio loginUser: ", err);
      throw new Error("Error en el Servicio loginUser: ", err.message);
    }
  }

  async editUser(userId, newData) {
    try {
      let editedUser = await User.findByIdAndUpdate(userId, newData, { new: true });
      if (!editedUser) {
        console.error("Usuario no encontrado");
        throw new Error("Usuario no encontrado");
      }
      
      return editedUser;
    } catch (err) {
      console.error("Error en el Servicio editUser: ", err);
      throw new Error("Error en el Servicio editUser: ", err.message);
    }
  }

  async deleteUser(_id) {
    try {
      let deletedUser = await User.findById(_id);
      if (!deletedUser) {
        console.error("Usuario no encontrado");
        throw new Error("Usuario no encontrado");
      }

      await User.findByIdAndDelete(_id);

      return deletedUser;
    } catch (err) {
      console.error("Error en el Servicio deleteUser: ", err);
      throw new Error("Error en el Servicio deleteUser: ", err.message);
    }
  }

  async getUserById(_id) {
    try {
      return await User.findById(_id);
    } catch (err) {
      console.error("Error en el Servicio getUserById: ", err);
      throw new Error("Error en el Servicio getUserById: ", err.message);
    }
  }

  async getUserByEmail(email) {
    try {
      return await User.findOne({email: email});
    } catch (err) {
      console.error("Error en el Servicio getUserByEmail: ", err);
      throw new Error("Error en el Servicio getUserByEmail: ", err.message);
    }
  }
  
}

module.exports = new userService();
