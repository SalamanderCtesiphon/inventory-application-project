#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");
const ItemInstance = require("./models/iteminstance");

const categories = [];
const items = [];
const iteminstances = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();/* 
  await createItemInstances(); */
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, description, price, number_in_stock, category) {
  const itemdetail = {
    name: name,
    description: description,
    price: price,
    number_in_stock: number_in_stock,
  };
  if (category != false) itemdetail.category = category;

  const item = new Item(itemdetail);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function itemInstanceCreate(index, item) {
  const bookinstancedetail = {
    item: item,
  };

  const iteminstance = new ItemInstance(iteminstancedetail);
  await iteminstance.save();
  iteminstances[index] = iteminstance;
  console.log(`Added iteminstance: ${item}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Fruit"),
    categoryCreate(1, "Vegetables"),
    categoryCreate(2, "Canned Goods"),
  ]);
}

async function createItems() {
  console.log("Adding Items");
  await Promise.all([
    itemCreate(0,
      "Carrot",
      "fresh vegetable",
      .99,
      10,
      [categories[1]]
    ),
    itemCreate(1,
      "Tomato",
      "sun ripened tomatos",
      1.02,
      1,
      [categories[1]]
    ),
    itemCreate(2,
      "Apple",
      "Delicious apples", 
      .50,
      100,
      [categories[0]]
    ),
    itemCreate(3,
      "Orange",
      "citrus delicious",
      2.00,
      20,
      [categories[0]]
    ),
    itemCreate(4,
      "Peas",
      "umm umm good",
      1.20,
      5,
      [categories[2]]
    ),
    itemCreate(5,
      "Corn",
      "canned fresh from the farm",
      1.50,
      120,
      [categories[2]]
    ),
    itemCreate(6,
      "Test Book 2",
      "Test Item",
      60.00,
      100,
      [categories[1]]
    ),
  ]);
}
/* 
async function createBookInstances() {
  console.log("Adding authors");
  await Promise.all([
    bookInstanceCreate(0, books[0], "London Gollancz, 2014.", false, "Available"),
    bookInstanceCreate(1, books[1], " Gollancz, 2011.", false, "Loaned"),
    bookInstanceCreate(2, books[2], " Gollancz, 2015.", false, false),
    bookInstanceCreate(3,
      books[3],
      "New York Tom Doherty Associates, 2016.",
      false,
      "Available"
    ),
    bookInstanceCreate(4,
      books[3],
      "New York Tom Doherty Associates, 2016.",
      false,
      "Available"
    ),
    bookInstanceCreate(5,
      books[3],
      "New York Tom Doherty Associates, 2016.",
      false,
      "Available"
    ),
    bookInstanceCreate(6,
      books[4],
      "New York, NY Tom Doherty Associates, LLC, 2015.",
      false,
      "Available"
    ),
    bookInstanceCreate(7,
      books[4],
      "New York, NY Tom Doherty Associates, LLC, 2015.",
      false,
      "Maintenance"
    ),
    bookInstanceCreate(8,
      books[4],
      "New York, NY Tom Doherty Associates, LLC, 2015.",
      false,
      "Loaned"
    ),
    bookInstanceCreate(9, books[0], "Imprint XXX2", false, false),
    bookInstanceCreate(10, books[1], "Imprint XXX3", false, false),
  ]);
} */