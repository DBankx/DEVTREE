const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  username: {
    type: String
  },
  company: {
    type: String
  },
  location: {
    type: String
  },
  website: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: { type: String, required: true },
      company: { type: String, required: true },
      position: { type: String },
      location: { type: String },
      from: { type: Date, required: true },
      current: { type: Boolean, default: false },
      to: { type: Date },
      description: { type: String }
    }
  ],
  education: [
    {
      school: { type: String, required: true },
      degree: { type: String, required: true },
      location: { type: String },
      gpa: { type: Number },
      fieldofstudy: { type: String, required: true },
      from: { type: Date, required: true },
      current: { type: Boolean, default: false },
      to: { type: String },
      description: { type: String }
    }
  ],
  social: {
    twitter: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    reddit: { type: String },
    facebook: { type: String },
    youtube: { type: String }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', profileSchema);
