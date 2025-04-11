const floorModal = require("../../models/floorModal");
const TableModal = require("../../models/tableModal");

/**
 * Create a new table
 * @param {Object} req - Express request object
 * @param {Object} req.body - Table data (tableName, tableNumber, tableChairs,  customerId, no_of_person, floor, customers)
 * @param {Object} res - Express response object
 */
exports.createTable = async (req, res) => {
  try {
    const {
      totalTable,
      tableNumber,
      totalChairs,
      capacity,
      floorNumber,
      floorId,
      floorUid
    } = req.body;

      
      // Check if the floorId exists
      const floor = await floorModal.findById(floorId);
      if (!floor) {
        return res.status(404).json({
          message: `No floor found with ID: ${floorId}`,
        });
      }
      

    // Check if the table number is already in use
    const existingTable = await TableModal.findOne({
      tableNumber,
      floor: floor._id,
    });
    if (existingTable) {
      return res.status(400).json({
        success: false,
        message: `A table with number ${tableNumber} already exists.`,
      });
      
    }

    const newTable = new TableModal({
      totalTable,
      tableNumber,
      totalChairs,
      capacity,
      floorNumber,
      floor: floor._id,
      floorUid
    });

    const savedTable = await newTable.save();

    // Update the floor by adding the tableId to its tables array
    floor.tables = floor.tables || [];
    floor.tables.push(savedTable._id);  // Add the new created table's ID to the floor's tables array


    // Save the updated floor
    await floor.save();

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
    // .populate("customers");
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
    // .populate("customers");
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
    // .populate("customers");
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
