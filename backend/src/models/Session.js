const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  jwt: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
