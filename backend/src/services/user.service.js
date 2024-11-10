const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const transporter = require('../config/email');

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
      console.error("Error en el Servicio createUser: " + err);
      throw new Error("Error en el Servicio createUser: " + err.message);
    }
  }

  async getAllUsers() {
    try {
      return await User.find({});
    } catch (err) {
      console.error("Error en el Servicio getAllUsers: " + err);
      throw new Error("Error en el Servicio getAllUsers: " + err.message);
    }
  }

  async forgotPassword(email) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      const token = crypto.randomBytes(20).toString('hex');  // Genero un token de recuperación

      // Guardo el token y su expiración en el usuario
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000;  // 1 hora
      await user.save();

      // Envío mail con el token
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Recuperación de contraseña - PostZone',
        html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
              <h2 style="color: #007BFF;">Recuperación de contraseña - PostZone</h2>
              <p>Recibiste este mensaje porque solicitaste recuperar tu contraseña.</p>
              <p><strong>Usa el siguiente token para restablecer tu contraseña:</strong></p>
              <pre style="background-color: #eee; padding: 10px; border-radius: 4px; font-size: 1.1em; font-family: monospace;">${token}</pre>
              <p style="margin-top: 20px;">Si no solicitaste este cambio, <strong>ignora este correo</strong>.</p>
            </div>
          </body>
        </html>
        `
      };

      await transporter.sendMail(mailOptions);
      return true;
    } catch (err) {
      console.error("Error en el Servicio forgotPassword: " + err);
      throw new Error("Error en el Servicio forgotPassword: " + err.message);
    }
  }

  async resetPassword(recoverToken, newPassword) {
    try {
      // Busco usuario por el token y verifico que el token no haya expirado
      const user = await User.findOne({
        resetPasswordToken: recoverToken,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
        throw new Error("Token inválido o expirado");
      }

      // Hasheo la nueva contraseña y actualizo el usuario
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;  // Actualizo la contraseña
      user.resetPasswordToken = undefined;  // Limpio el token
      user.resetPasswordExpires = undefined;
      await user.save();

      return true;
    } catch (err) {
      console.error("Error en el Servicio resetPassword: " + err);
      throw new Error("Error en el Servicio resetPassword: " + err.message);
    }
  }

  async editUser(userId, newData) {
    try {
      if (newData.username) {
        const existingUser = await User.findOne({ username: newData.username });

        if (existingUser && existingUser._id.toString() !== userId.toString()) {
          console.error("El nombre de usuario ya está en uso");
          throw new Error("El nombre de usuario ya está en uso");
        }
      }
  
      const editedUser = await User.findByIdAndUpdate(userId, newData, { new: true });

      if (!editedUser) {
        console.error("Usuario no encontrado");
        throw new Error("Usuario no encontrado");
      }
  
      return editedUser;
    } catch (err) {
      console.error("Error en el Servicio editUser: " + err);
      throw new Error("Error en el Servicio editUser: " + err.message);
    }
  }

  async deleteUser(_id) {
    try {
      const deletedUser = await User.findById(_id);
      if (!deletedUser) {
        console.error("Usuario no encontrado");
        throw new Error("Usuario no encontrado");
      }

      await User.findByIdAndDelete(_id);

      return deletedUser;
    } catch (err) {
      console.error("Error en el Servicio deleteUser: " +  err);
      throw new Error("Error en el Servicio deleteUser: " + err.message);
    }
  }

  async searchUsersByUsername(username) {
    try {
      // Uso expresión regular para coincidencia parcial en username (insensible a mayúsculas)
      const regex = new RegExp(username, 'i');
      return await User.find({ username: regex }).sort({ username: 1 }); // Ordeno alfabéticamente por username
    } catch (err) {
      console.error("Error en el Servicio searchUsersByUsername: " + err);
      throw new Error("Error en el Servicio searchUsersByUsername: " + err.message);
    }
  }
  
  async getUserById(_id) {
    try {
      return await User.findById(_id);
    } catch (err) {
      console.error("Error en el Servicio getUserById: " + err);
      throw new Error("Error en el Servicio getUserById: " + err.message);
    }
  }
  
  async getUserByUsername(username) {
    try {
      return await User.findOne({ username });
    } catch (err) {
      console.error("Error en el Servicio getUserByUsername: " + err);
      throw new Error("Error en el Servicio getUserByUsername: " + err.message);
    }
  }
  
  async getUserByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (err) {
      console.error("Error en el Servicio getUserByEmail: " + err);
      throw new Error("Error en el Servicio getUserByEmail: " + err.message);
    }
  }
  
}

module.exports = new userService();
