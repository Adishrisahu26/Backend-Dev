import express from "express";
import mongoose from "mongoose";
import User from "./userModel.js";

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/activityDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


// Create user
app.post("/create", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// Login
app.post("/login/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  await user.login();
  res.json(user);
});

// Logout
app.post("/logout/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  await user.logout();
  res.json(user);
});

// Get user
app.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});