const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 100 },
  price: { type: Number, required: true },
  number_in_stock: { type: Number },
  category: [{ type: Schema.Types.ObjectId, ref: "Category"}]
});

// Virtual for items url
ItemSchema.virtual("url").get(function () {
  return `/inventory/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);