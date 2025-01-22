const TableModal = require("../../models/tableModal");

/**
 * Create a new table
 * @param {Object} req - Express request object
 * @param {Object} req.body - Table data (tableName, tableNumber, tableChairs, tableStatus, bookingDate, bookingStartTime, customerId, no_of_person, floor, customers)
 * @param {Object} res - Express response object
 */
exports.createTable = async (req, res) => {
  try {
    const {
      tableName,
      tableNumber,
      tableChairs,
      tableStatus,
      bookingDate,
      bookingStartTime,
      customerId,
      no_of_person,
      floor,
      customers,
    } = req.body;

    const newTable = new TableModal({
      tableName,
      tableNumber,
      tableChairs,
      tableStatus,
      bookingDate,
      bookingStartTime,
      customerId,
      no_of_person,
      floor,
      customers,
    });

    const savedTable = await newTable.save();
    res.status(201).json({ success: true, data: savedTable });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

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

/**
 * Update a table by ID
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Table ID
 * @param {Object} req.body - Updated table data
 * @param {Object} res - Express response object
 */
exports.updateTable = async (req, res) => {
  try {
    const updatedTable = await TableModal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("customerId")
      .populate("floor")
      .populate("customers");
    if (!updatedTable) {
      return res
        .status(404)
        .json({ success: false, message: "Table not found" });
    }
    res.status(200).json({ success: true, data: updatedTable });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete a table by ID
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Table ID
 * @param {Object} res - Express response object
 */
exports.deleteTable = async (req, res) => {
  try {
    const deletedTable = await TableModal.findByIdAndDelete(req.params.id);
    if (!deletedTable) {
      return res
        .status(404)
        .json({ success: false, message: "Table not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Table deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
