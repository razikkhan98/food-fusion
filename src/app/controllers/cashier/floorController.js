const FloorModal = require("../../models/floorModal");

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
