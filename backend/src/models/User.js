const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  profilePicture: { type: String },
  coverPhoto: { type: String },
  bio: { type: String },
  postCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  gamificationLevel: { type: Number, default: 1 },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  followerCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
