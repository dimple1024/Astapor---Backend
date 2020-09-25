const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: false,
    unique: true,
    max: 50,
    min: 6,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    max: 555,
    min: 10,
    validate: {
      validator: isEmail,
      message: "Email id is invalid",
    },
    isVerfied: false,
  },
  password: {
    type: String,
    required: true,
    max: 255,
    min: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
