import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  lastLogin: Date,
  lastLogout: Date,
  lastActive: Date
});

// Middleware → runs before save
userSchema.pre("save", function (next) {
  this.lastActive = new Date();
  next();
});

// Login method
userSchema.methods.login = function () {
  this.lastLogin = new Date();
  return this.save();
};

// Logout method
userSchema.methods.logout = function () {
  this.lastLogout = new Date();
  return this.save();
};

const User = mongoose.model("User", userSchema);
export default User;