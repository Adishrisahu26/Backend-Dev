import express from "express";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

app.use(express.json());

// 🔐 Security Middlewares
app.use(xss()); // prevents XSS
app.use(mongoSanitize()); // prevents NoSQL injection

// Test route
app.post("/data", (req, res) => {
  res.json({
    message: "Data received safely",
    data: req.body
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});