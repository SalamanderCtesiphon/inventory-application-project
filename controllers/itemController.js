const Item = require("../models/item");
const Category = require("../models/category");
const ItemInstance = require("../models/iteminstance");
const asyncHandler = require("express-async-handler");


exports.index = asyncHandler(async (req, res, next) => {
  // Get details of items, item instances, and category counts (in parallel)
  const [
    numItems,
    numItemInstances,
    numAvailableItemInstances,
    numCategories,
  ] = await Promise.all([
    Item.countDocuments({}).exec(),
    ItemInstance.countDocuments({}).exec(),
    ItemInstance.countDocuments({ status: "Available" }).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Inventory Application Home",
    item_count: numItems,
    item_instance_count: numItemInstances,
    item_instance_available_count: numAvailableItemInstances,
    category_count: numCategories,
  });
});

// Display list of all items.
exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "Item name")
    .sort({ name: 1})
    .exec();

  res.render("item_list", { title: "Item List", item_list: allItems });
});

// Display detail page for a specific item.
// Display detail page for a specific item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  // Get details of items, item instances for specific item
  const [item, itemInstances] = await Promise.all([
    Item.findById(req.params.id).populate("category").exec(),
    ItemInstance.find({ item: req.params.id }).exec(),
  ]);

  if (item === null) {
    // No results.
    const err = new Error("item not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_detail", {
    title: item.name,
    item: item,
    item_instances: itemInstances,
  });
});


// Display item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item create GET");
});

// Handle item create on POST.
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item create POST");
});

// Display item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item delete GET");
});

// Handle item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item delete POST");
});

// Display item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item update GET");
});

// Handle item update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item update POST");
});
