// const mongoose = require('mongoose');

// // Schema for Add-ons
// const AddOnSchema = new mongoose.Schema({
//   option: { type: String, required: false},
//   price: { type: Number, required: false },
// });

// // Schema for Subcategories
// const SubcategorySchema = new mongoose.Schema({
//     // id: { type: Number, required: true },
//     foodImg: { type: String, required: true },
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     subcategoriesStatus: { type: Array },
//     subcategoriesType: { type: Array },
//     add_ons: [AddOnSchema],
//   });
  
//   // Schema for Categories
//   const CategorySchema = new mongoose.Schema({
//     image: { type: String },
//     name: { type: String, required: true },
//     category: { type: String, required: true },
//     menuCode: { type: String, required: true },
//     categoriesTotalIteam : { type: Number },
//     subcategories: [SubcategorySchema],
//   });


// //   // The Menu model (Main model for menu items)
// // const MenuSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   category: { type: String, required: true },
// //   menuCode: { type: String, required: true },
// //   subcategories: [SubcategorySchema],  // Array of subcategories
// // });


// module.exports = mongoose.model('Menu', CategorySchema);








// models/order.js
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  customerID: { type: mongoose.Schema.Types.ObjectId, required: true },
  // menuID: { type: mongoose.Schema.Types.ObjectId },
  floorName: String,  
  tableNumber: Number, 
  orderID: { type: String, default: null},
  status: {
    type: String,
    trim: true,
    default: "Order making",
    enum: [
      "empty",
      "Order pending",
      "Order making",
      "Table reserved",
      "Order completed"
    ],
  },
  categories: [
    {
      categoriesName: { type: String, required: true },
      subcategories: [
        {
          subcategoriesName: { type: String, required: true },
          subcategoriesAmount: { type: Number, required: true },
          subcategoriesType: { type: String, required: true },
          quantity: { type: Number, required: true },
          totalAmount: { type: Number, required: true },
          totalItemTax: { type: Number, required: true },
          discountOffer: String, 
          extraAddon: [
            {
              addonName: String,  
              addonAmount: Number, 
              addonQuantity: Number
            }
          ]
        }
      ]
    }
  ]
});

const Order = mongoose.model('Menu', menuSchema);

module.exports = Order;
