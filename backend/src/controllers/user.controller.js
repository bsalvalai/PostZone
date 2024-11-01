const userService = require('../services/user.service.js');

const createUser = async (req, res) => {
  try {
    const { name, username, email, password, gender, profilePicture, coverPhoto } = req.body;
    const user = await userService.createUser({ name, username, email, password, gender, profilePicture, coverPhoto });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const newData = req.body;
    const editedUser = await userService.editUser(userId, newData);
    res.status(200).json(editedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- FALTA service ---
const deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedUser = await userService.deleteUser(_id);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- FALTA service ---
const getUser = async (req, res) => {
  try {
    const { _id, email } = req.query;
    let user;
    if (_id) {
      user = await userService.getUserById(_id);
    } else if (email) {
      user = await userService.getUserByEmail(email);
    } else {
      return res.status(400).json({ message: 'Se requiere ID o email del Usuario' });
    }
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  editUser,
  deleteUser,
  getUser
};
