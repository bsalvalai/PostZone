const userService = require('../services/user.service.js');

const createUser = async (req, res) => {
  try {
    const { name, username, email, password, gender, profilePicture, coverPhoto } = req.body;
    const user = await userService.createUser({ name, username, email, password, gender, profilePicture, coverPhoto });
    
    res.status(201).json(user);
  } catch (err) {
    console.error("Error en el Controlador createUser: " + err);
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json(users);
  } catch (err) {
    console.error("Error en el Controlador getAllUsers: " + err);
    res.status(500).json({ error: err.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await userService.forgotPassword(email);

    res.status(200).json({ message: 'Correo de recuperación enviado' });
  } catch (err) {
    console.error("Error en el Controlador forgotPassword: " + err);
    res.status(500).json({ error: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { recoverToken, newPassword } = req.body;
    const result = await userService.resetPassword(recoverToken, newPassword);
    
    res.status(200).json({ message: 'Contraseña actualizada con éxito' });
  } catch (err) {
    console.error("Error en el Controlador resetPassword: " + err);
    res.status(500).json({ error: err.message });
  }
};

const getMyUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userService.editUser(userId);

    res.status(200).json(user);
  } catch (err) {
    console.error("Error en el Controlador getMyUser: " + err);
    res.status(500).json({ error: err.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const deletedUser = await userService.deleteUser(userId);

    res.status(200).json(deletedUser);
  } catch (err) {
    console.error("Error en el Controlador deleteUser: " + err);
    res.status(500).json({ error: err.message });
  }
};

const editUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const allowedFields = ["name", "username", "email", "password", "gender", "profilePicture", "coverPhoto", "bio"];
    
    const newData = Object.keys(req.body)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
      }, {});

    const editedUser = await userService.editUser(userId, newData);

    res.status(200).json(editedUser);
  } catch (err) {
    console.error("Error en el Controlador editUser: " + err);
    res.status(500).json({ error: err.message });
  }
};


const getFavorites = async (req, res) => {
  // COMPLETAR
}

const getFollowing = async (req, res) => {
  // COMPLETAR
}

const getFollowers = async (req, res) => {
  // COMPLETAR
}

const searchUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: 'Se requiere un username para realizar la búsqueda' });
    }

    const users = await userService.searchUsersByUsername(username);

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No se encontraron usuarios' });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error("Error en el Controlador searchUser: " + err);
    res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await userService.getUserById(_id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error en el Controlador getUser: " + err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  forgotPassword,
  resetPassword,
  getMyUser,
  deleteUser,
  editUser,
  getFavorites,
  getFollowing,
  getFollowers,
  searchUser,
  getUser
};
