const sessionService = require('../services/session.service.js');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, tokenExpiration, userId, username, email: userEmail } = await sessionService.login({ email, password });

    if (!token) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    res.status(200).json({ message: 'Sesión iniciada exitosamente', token, tokenExpiration, userId, username, email: userEmail });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.token;
    await sessionService.logout(token);
    res.status(204).json({ message: 'Sesión finalizada exitosamente' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const oldToken = req.token;
    const { newToken, tokenExpiration, userId, username, email: userEmail } = await sessionService.refreshToken(oldToken);

    if (!newToken) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    res.status(200).json({ message: 'Token actualizado exitosamente', newToken, tokenExpiration, userId, username, email: userEmail });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  login,
  logout,
  refreshToken
};
