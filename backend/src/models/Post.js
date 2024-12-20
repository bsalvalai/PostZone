const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, default: null },
  date: { type: String, required: true },
  location: { type: String, default: null },
  images: [{ type: String, required: true }],
  likeCount: { type: Number, default: 0 },
  postComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
