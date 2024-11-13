const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  jwtToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tokenDuration: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
