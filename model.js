import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  deleted: {
    type: Boolean,
    default: false
  }
});

// 🔥 Hide deleted data automatically
itemSchema.pre(/^find/, function (next) {
  this.where({ deleted: false });
  next();
});

// 🔥 Soft delete instead of real delete
itemSchema.methods.softDelete = function () {
  this.deleted = true;
  return this.save();
};

const Item = mongoose.model("Item", itemSchema);
export default Item;