const User = require('../models/User');
const bcrypt = require('bcrypt');

class userService {

  async createUser({ name, username, email, password, gender, profilePicture, coverPhoto }) {
    try {
      let isUserRegistered = await User.findOne({ email: email });
      if (isUserRegistered) {
        console.error("El usuario ya está registrado");
        throw new Error("El usuario ya está registrado");
      }

      let hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ name, username, email, password: hashedPassword, gender, profilePicture, coverPhoto });
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
      throw new Error("Error en el Servicio editUser: " + err.message);
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
      throw new Error("Error en el Servicio deleteUser: " + err.message);
    }
  }

  async getUserById(_id) {
    try {
      return await User.findById(_id);
    } catch (err) {
      console.error("Error en el Servicio getUserById: ", err);
      throw new Error("Error en el Servicio getUserById: " + err.message);
    }
  }

  async getUserByEmail(email) {
    try {
      return await User.findOne({email: email});
    } catch (err) {
      console.error("Error en el Servicio getUserByEmail: ", err);
      throw new Error("Error en el Servicio getUserByEmail: " + err.message);
    }
  }
  
}

module.exports = new userService();
