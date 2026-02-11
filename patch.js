const express = require("express");
const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "adishri", marks: 80, city: "Hyderabad" },
    { id: 2, name: "bhumi", marks: 90, city: "jaipur" },
];


app.get("/students", (req, res) => {
    res.json(students);
});

app.patch("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);   
    const updates = req.body;

    const student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    Object.assign(student, updates);

    res.json({ message: "Student updated successfully", student });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
