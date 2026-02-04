import express from "express";
import { userData } from "./data.js";

const app = express();

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    return res.send("Home route");
});

// Get All Users
app.get("/user", (req, res) => {
    return res.json(userData);
});

// Get User with id = 1
app.get("/user/1", (req, res) => {
    return res.json(userData[0]); // array index starts from 0
});

// Get User by ID (Dynamic Route)
app.get("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = userData.find((usr) => usr.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    return res.json(user);
});

// Query Params Example
// http://localhost:3000/search?name=John&password=qwert
app.get("/search", (req, res) => {
    const { name, password } = req.query;
    console.log(req.query);

    return res.json({ name, password });
});

app.get("/admin", (req, res) => {
    return res.send("Admin route");
});

app.get("/profile", (req, res) => {
    return res.send("Profile route");
});

// POST User
app.post("/user", (req, res) => {
    const newUser = req.body;
    console.log(newUser);

    return res.status(201).json({
        message: "Data received successfully",
        data: newUser,
    });
});

// Start Server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
