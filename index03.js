import express from "express";
import mongoose from "mongoose";
import Item from "./model.js";

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/softDeleteDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


// ➤ Create item
app.post("/create", async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json(item);
});

// ➤ Get all (deleted items hidden automatically)
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// ➤ Soft delete
app.delete("/delete/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  await item.softDelete();
  res.json({ message: "Item soft deleted" });
});

// ➤ View all including deleted (optional)
app.get("/all", async (req, res) => {
  const items = await Item.find().where({}); // bypass filter
  const all = await Item.find().setOptions({}); 
  res.json(all);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});