const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class userService {

  async createUser({ username, email, password }) {
    try {
      let isUserRegistered = await User.findOne({email: email});
      if(isUserRegistered){
        console.error("El usuario ya está registrado");
        throw new Error("El usuario ya está registrado");
      }
      else {
        let hashedPassword = await bcrypt.hash(password, 10);
        let user = new User({ username, email, password: hashedPassword });

        await user.save();
        return user;
      }
    } catch (err) {
      console.error("Error en el Servicio createUser: ", err);
      throw new Error("Error en el Servicio createUser: ", err);
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
      throw new Error("Error en el Servicio loginUser: ", err);
    }
  }

  async editUser(_id, newData) {
    try {
      let editedUser = await User.findByIdAndUpdate(_id, newData, { new: true });
      if (!editedUser) {
        console.error("Usuario no encontrado");
        throw new Error("Usuario no encontrado");
      }

      return editedUser;
    } catch (err) {
      console.error("Error en el Servicio editUser: ", err);
      throw new Error("Error en el Servicio editUser: ", err);
    }
  }

  async updateUser(_id, newData) {
    try {
      let updatedUser = await User.findByIdAndUpdate(_id, newData, { new: true });
      if (!updatedUser) {
        console.error("Usuario no encontrado");
        throw new Error("Usuario no encontrado");
      }

      return updatedUser;
    } catch (err) {
      console.error("Error en el Servicio updateUser: ", err);
      throw new Error("Error en el Servicio updateUser: ", err);
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
      throw new Error("Error en el Servicio deleteUser: ", err);
    }
  }

  async getUserById(_id) {
    try {
      return await User.findById(_id);
    } catch (err) {
      console.error("Error en el Servicio getUserById: ", err);
      throw new Error("Error en el Servicio getUserById: ", err);
    }
  }

  async getUserByEmail(email) {
    try {
      return await User.findOne({email: email});
    } catch (err) {
      console.error("Error en el Servicio getUserByEmail: ", err);
      throw new Error("Error en el Servicio getUserByEmail: ", err);
    }
  }
  
}

module.exports = new userService();
