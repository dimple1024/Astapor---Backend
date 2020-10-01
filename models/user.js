const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
    minlength: 6,
    trim: true,
    match: /^\w+$/,
  },
  emailId: {
    type: String,
    required: [true, "Email ID is required"],
    unique: true,
    maxlength: 555,
    minlength: 10,
    match: /^\w+@[a-z]+\.\w+$/,
    // validate: {
    //   message: "Email id is invalid",
    // },
  },
  password: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
