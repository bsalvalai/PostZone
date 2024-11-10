const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  profilePicture: { type: String },
  coverPhoto: { type: String },
  commentCount: { type: Number, default: 0 },
  gamificationLevel: { type: Number, default: 1 },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  userPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  favoritePosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  followerUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followingUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
