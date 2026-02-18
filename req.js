app.get("/api/users", (req, res) => {
    const { name } = req.query;

    if (name) {
        const filteredUsers = users.filter(user =>
            user.first_name.toLowerCase().includes(name.toLowerCase())
        );
        return res.json(filteredUsers);
    }

    return res.json(users);
});
