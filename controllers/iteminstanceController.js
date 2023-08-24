const ItemInstance = require("../models/iteminstance");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const Item = require("../models/item");

// Display list of all ItemInstances.
exports.iteminstance_list = asyncHandler(async (req, res, next) => {
  const allItemInstances = await ItemInstance.find().populate("item").exec();

  res.render("iteminstance_list", {
    title: "Item Instance List",
    iteminstance_list: allItemInstances,
  });
});


// Display detail page for a specific ItemInstance
// Display detail page for a specific itemInstance.
exports.iteminstance_detail = asyncHandler(async (req, res, next) => {
  const itemInstance = await ItemInstance.findById(req.params.id)
    .populate("item")
    .exec();

  if (itemInstance === null) {
    // No results.
    const err = new Error("Item copy not found");
    err.status = 404;
    return next(err);
  }

  res.render("iteminstance_detail", {
    title: "Item:",
    iteminstance: itemInstance,
  });
});


// Display ItemInstance create form on GET
// Display ItemInstance create form on GET.
exports.iteminstance_create_get = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "name").exec();

  res.render("iteminstance_form", {
    title: "Create ItemInstance",
    item_list: allItems,
  });
});


// Handle ItemInstance create on POST
// Handle itemInstance create on POST.
exports.iteminstance_create_post = [
  // Validate and sanitize fields.
  body("item", "item must be specified").trim().isLength({ min: 1 }).escape(),
  

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a itemInstance object with escaped and trimmed data.
    const itemInstance = new ItemInstance({
      item: req.body.item,
    
    });

    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with sanitized values and error messages.
      const allitems = await Item.find({}, "name").exec();

      res.render("iteminstance_form", {
        title: "Create itemInstance",
        item_list: allitems,
        selected_item: itemInstance.item._id,
        errors: errors.array(),
        iteminstance: itemInstance,
      });
      return;
    } else {
      // Data from form is valid
      await itemInstance.save();
      res.redirect(itemInstance.url);
    }
  }),
];




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
