const ItemInstance = require("../models/iteminstance");
const asyncHandler = require("express-async-handler");

// Display a list of all item instances
exports.iteminstance_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: ItemInstance list");
});

// Display detail page for a specific ItemInstance
exports.iteminstance_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: ItemInstance detail: ${req.params.id}`);
});

// Display ItemInstance create form on GET
exports.iteminstance_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: ItemInstace create GET");
});

// Handle ItemInstance create on POST
exports.iteminstance_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMNETED: ItemInstance create POST");
});



// Display ItemInstance delete form on GET.
exports.iteminstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: ItemInstance delete GET");
});

// Handle iteminstance delete on POST.
exports.iteminstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: iteminstance delete POST");
});

// Display iteminstance update form on GET.
exports.iteminstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: iteminstance update GET");
});

// Handle iteminstance update on POST.
exports.iteminstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: iteminstance update POST");
});
