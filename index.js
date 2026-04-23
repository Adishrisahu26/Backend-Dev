import express from "express";
import logger from "./logger.js";

const app = express();

// use middleware
app.use(logger);

// test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});