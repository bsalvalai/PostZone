const userService = require('../services/user.service.js');

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await userService.createUser({ username, email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, _id, username, mail } = await userService.loginUser({ email, password });
    if (!token) {
      return res.status(401).json({ message: 'Credenciales inválidas para el login' });
    }

    res.status(200).json({ token, _id, username, mail });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const newData = req.body;
    const editedUser = await userService.editUser(_id, newData);
    res.status(200).json(editedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedUser = await userService.deleteUser(_id);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
  loginUser,
  editUser,
  deleteUser,
  getUser
};
