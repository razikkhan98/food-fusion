const asyncHandler = require("express-async-handler");
const menuModel = require("../../models/menuModel");
const { generateMenuCode } = require("../../../app/utils/code");


exports.addMenu = asyncHandler(async (req, res) => {
  const { name, category, subcategories } = req.body;
  try {
    // Validate required fields
    if (!category || !subcategories || !subcategories.length) {
      return res.status(400).json({
        success: false,
        message: "Category and subcategory are required",
      });
    }

    // Check if the same menu item (category + subcategory name) already exists
    const duplicate = await menuModel.findOne({
      category,
      "subcategories.name": { $in: subcategories.map((sub) => sub.name) },
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Menu item with the same name already exists in this category",
      });
    }


    // Generate a menu code (e.g., "Cheese Pizza" => "C P")
    const menuCode = generateMenuCode(name);
    console.log("code: ", menuCode);

    const menu = await menuModel.create({
      name,
      category,
      menuCode,
      subcategories,
    });
    await menu.save();
    // const savedMenu = await menu.save();
    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: menu
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create menu item",
      error: error.message
    });
  }
});


// Search for menu items (by name or code)
exports.searchMenu = async (req, res) => {
  const { query } = req.query; // The search query (e.g., name or code)
  console.log(query)

  // Check if query is a valid non-empty string
  if (!query || typeof query !== 'string' || query.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Invalid or missing search query',
    });
  }

  try {
    const menus = await menuModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },  // Search by name (case-insensitive)
        { menuCode: { $regex: query, $options: 'i' } },  // Search by menu code
      ],
    });

    if (menus.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No menu items found',
      });
    }

    res.status(200).json({
      success: true,
      message: "Menus found successfully",
      data: menus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while searching for menus',
      error: error.message,
    });
  }
};


