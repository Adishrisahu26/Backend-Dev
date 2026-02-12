import express from "express";
const app = express();

app.use(express.json());
 
let students = [
    { id: 1, name: "abhY", marks: 60, city: "Delhi" },
    { id: 2, name: "Rahul", marks: 70, city: "Mumbai" },
    { id: 3, name: "Priya", marks: 80, city: "Bangalore" }
];


app.get("/students", (req, res) => {
    res.json(students);
});

app.delete("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    if (students[index].marks > 70) {
        return res.status(400).json({
            message: "Cannot delete student with marks above 70"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.json({
        message: "Student deleted successfully",
        deletedStudent: deletedStudent[0]
    });
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
