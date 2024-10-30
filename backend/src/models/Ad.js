const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  image: { type: String },
  url: { type: String, required: true },
  shareUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Ad', adSchema);
