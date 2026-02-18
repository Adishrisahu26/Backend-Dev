const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// ================= HTML ROUTE =================
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map(user => 
            `<li>${user.first_name} ${user.last_name}</li>`
        ).join("")}
    </ul>`;
    res.send(html);
});


// ================= GET ALL USERS =================
app.get("/api/users", (req, res) => {
    return res.json(users);
});


// ================= GET USER BY ID =================
app.get("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
});


// ================= CREATE USER =================
app.post("/api/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        ...req.body
    };

    users.push(newUser);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) return res.status(500).json({ message: "File write failed" });

        return res.status(201).json({
            message: "User created successfully",
            user: newUser
        });
    });
});


// ================= UPDATE USER =================
app.patch("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    Object.assign(user, req.body);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) return res.status(500).json({ message: "File write failed" });

        return res.json({
            message: "User updated successfully",
            user
        });
    });
});


// ================= DELETE USER =================
app.delete("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = users.splice(index, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) return res.status(500).json({ message: "File write failed" });

        return res.json({
            message: "User deleted successfully",
            deletedUser
        });
    });
});


app.listen(8080, () => {
    console.log("Server started on port 8080");
});
