const FloorModal = require("../../models/floorModal");

/**
 * Create a new floor
 * @param {Object} req - Express request object
 * @param {Object} req.body - Floor data (floorName, floorNumber, floorCapacity)
 * @param {Object} res - Express response object
 */


exports.createFloor = async (req, res) => {
  try {
    const floor = await FloorModal.create(req.body);
    res.status(201).json({ success: true, message: "Add new floor successfully" ,data: floor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};



/**
 * Get all floors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getFloors = async (req, res) => {
  try {
    const floors = await FloorModal.find();
    res.status(200).json({ success: true, data: floors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



/**
 * Get a single floor by ID
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Floor ID to retrieve
 * @param {Object} res - Express response object
 */
exports.getFloorById = async (req, res) => {
  try {
    const floor = await FloorModal.findById(req.params.id);
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
