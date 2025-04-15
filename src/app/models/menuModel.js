// // const mongoose = require('mongoose');

// // // Schema for Add-ons
// // const AddOnSchema = new mongoose.Schema({
// //   option: { type: String, required: false},
// //   price: { type: Number, required: false },
// // });

// // // Schema for Subcategories
// // const SubcategorySchema = new mongoose.Schema({
// //     // id: { type: Number, required: true },
// //     foodImg: { type: String, required: true },
// //     name: { type: String, required: true },
// //     description: { type: String, required: true },
// //     price: { type: Number, required: true },
// //     subcategoriesStatus: { type: Array },
// //     subcategoriesType: { type: Array },
// //     add_ons: [AddOnSchema],
// //   });
  
// //   // Schema for Categories
// //   const CategorySchema = new mongoose.Schema({
// //     image: { type: String },
// //     name: { type: String, required: true },
// //     category: { type: String, required: true },
// //     menuCode: { type: String, required: true },
// //     categoriesTotalIteam : { type: Number },
// //     subcategories: [SubcategorySchema],
// //   });


// // //   // The Menu model (Main model for menu items)
// // // const MenuSchema = new mongoose.Schema({
// // //   name: { type: String, required: true },
// // //   category: { type: String, required: true },
// // //   menuCode: { type: String, required: true },
// // //   subcategories: [SubcategorySchema],  // Array of subcategories
// // // });


// // module.exports = mongoose.model('Menu', CategorySchema);






const mongoose = require("mongoose");

const addonSchema = new mongoose.Schema(
  {
    addonName: { type: String },
    addonAmount: { type: Number },
    addonQuantity: { type: Number },
    addonNotes: { type: String },
  },
  { _id: false }
);

const subcategorySchema = new mongoose.Schema(
  {
    subcategoriesName: { type: String },
    subcategoriesAmount: { type: Number },
    subcategoriesType: { type: String },
    quantity: { type: Number, default: 1 },
    totalAmount: { type: Number },
    totalItemTax: { type: Number },
    discount: { type: String, default: "" }, // Optional
    extraAddon: [addonSchema],
  },
  { _id: false }
);

const categorySchema = new mongoose.Schema(
  {
    categoriesName: { type: String },
    subcategories: [subcategorySchema],
  },
  { _id: false }
);

const menuSchema = new mongoose.Schema(
  {
    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    floorName: { type: String },
    tableNumber: { type: Number },
    orderID: { type: String }, // Example: ORD-01, ORD-02
    categories: [categorySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);

