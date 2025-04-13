const FloorModal = require("../../models/floorModal");
const { generateFloorUid } = require("../../../app/utils/code");

/**
 * Create a new floor
 * @param {Object} req - Express request object
 * @param {Object} req.body - Floor data (floorName, floorNumber, floorCapacity)
 * @param {Object} res - Express response object
 */

exports.createFloor = async (req, res) => {
  try {
    const { restaurantName, floorName, floorNumber, } = req.body;

    // Check if all required fields are provided
    if (!restaurantName || !floorName || !floorNumber ) {
      return res.status(400).json({
        success: false,
        message:
          "All required fields: restaurantName, floorName, floorNumber, or floorCapacity.",
      });
    }



    //Generate floor UID
    const floorUid = generateFloorUid(restaurantName, floorName, floorNumber);

    // Check if floor number already exists for the same restaurant
    const existingFloorNumber = await FloorModal.findOne({
      restaurantName,
      floorNumber,
    });
    if (existingFloorNumber) {
      return res.status(400).json({
        success: false,
        message: `Floor number ${existingFloorNumber.floorNumber} already exists for restaurant ${restaurantName}.`,
      });
    }

    // Check if floor name already exists for the same restaurant
    const existingFloorName = await FloorModal.findOne({
      restaurantName,
      floorName,
    });
    if (existingFloorName) {
      return res.status(400).json({
        success: false,
        message: `Floor number ${existingFloorName.floorName} already exists for restaurant ${restaurantName}.`,
      });
    }

    // Calculate floor capacity in Toal Chairs in this floor fllorCapacity




    // Create new user
    const floor = await FloorModal.create({
      restaurantName,
      floorName,
      floorNumber,
      floorCapacity: 0, // Start at 0 — will increase as tables are added
      floorUid,
    });

    res.status(201).json({
      success: true,
      message: "Add new floor successfully",
      data: floor,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Get all floors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

// exports.getAllFloors = async (req, res) => {
//   const floors = await FloorModal.find().populate("tables");

//   res.status(200).json({
//     success: true,
//     count: floors.length,
//     data: floors,
//   });
// };


exports.getAllFloors = async (req, res) => {
  try {
    const floors = await FloorModal.find().populate("tables");
    res.status(200).json({
      success: true,
      count: floors.length,
      data: floors,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}





/**
 * Get a single floor by ID
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Floor ID to retrieve
 * @param {Object} res - Express response object
 */
exports.getFloorById = async (req, res) => {
  try {
    const floor = await FloorModal.findById(req.params.id).populate("tables");
    if (!floor) {
      return res
        .status(404)
        .json({ success: false, message: "Floor not found" });
    }
    res.status(200).json({ success: true, data: floor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update a floor by ID
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Floor ID to update
 * @param {Object} req.body - Updated floor data
 * @param {Object} res - Express response object
 */
exports.updateFloor = async (req, res) => {
  try {
    const floor = await FloorModal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!floor) {
      return res
        .status(404)
        .json({ success: false, message: "Floor not found" });
    }
    res.status(200).json({ success: true, data: floor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Delete a floor by ID
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Floor ID to delete
 * @param {Object} res - Express response object
 */
exports.deleteFloor = async (req, res) => {
  try {
    const floor = await FloorModal.findByIdAndDelete(req.params.id);
    if (!floor) {
      return res
        .status(404)
        .json({ success: false, message: "Floor not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Floor deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
