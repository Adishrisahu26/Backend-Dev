import express from "express";
import jwt from "jsonwebtoken";
import mfaMiddleware from "./mfaMiddleware.js";

const app = express();

// Dummy login route → gives token
app.get("/login", (req, res) => {
  const user = { id: 1, name: "Adishri" };

  const token = jwt.sign(user, "secretkey", { expiresIn: "1h" });

  res.json({
    message: "Login successful",
    token: token,
    otp: "123456" // demo OTP
  });
});

// Protected route (MFA required)
app.get("/secure", mfaMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});