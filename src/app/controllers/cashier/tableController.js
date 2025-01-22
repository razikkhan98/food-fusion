const TableModal = require("../../models/tableModal");

/**
 * Retrieve all tables
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllTables = async (req, res) => {
  try {
    const tables = await TableModal.find()
      .populate("customerId")
      .populate("floor")
      .populate("customers");
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Retrieve a table by ID
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Table ID
 * @param {Object} res - Express response object
 */
exports.getTableById = async (req, res) => {
  try {
    const table = await TableModal.findById(req.params.id)
      .populate("customerId")
      .populate("floor")
      .populate("customers");
    if (!table) {
      return res
        .status(404)
        .json({ success: false, message: "Table not found" });
    }
    res.status(200).json({ success: true, data: table });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
