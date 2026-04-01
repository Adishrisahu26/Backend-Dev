const express = require("express");
const mongoose = require("mongoose");

const app = express();

// IMPORTANT 👇
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// IMPORT ROUTES 👇
const taskRoutes = require("./routes/taskRoutes");

// USE ROUTES 👇 (VERY IMPORTANT)
app.use("/api/tasks", taskRoutes);

// TEST ROUTE (for checking)
app.get("/", (req, res) => {
  res.send("Server Working");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});