
const mongoose = require('mongoose');

// Schema for Add-ons
const AddOnSchema = new mongoose.Schema({
  option: { type: String, required: false},
  price: { type: Number, required: false },
});

// Schema for Subcategories
const SubcategorySchema = new mongoose.Schema({
    // id: { type: Number, required: true },
    foodImg: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    subcategoriesStatus: { type: Array },
    subcategoriesType: { type: Array },
    add_ons: [AddOnSchema],
  });
  
  // Schema for Categories
  const CategorySchema = new mongoose.Schema({
    // id: { type: Number, required: true },
    image: { type: String },
    category: { type: String, required: true },
    categoriesTotalIteam : { type: Number },
    subcategories: [SubcategorySchema],
  });


  // The Menu model (Main model for menu items)
const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  menuCode: { type: String, required: true },
  subcategories: [SubcategorySchema],  // Array of subcategories
});


module.exports = mongoose.model('Menu', MenuSchema);
