const CustomerModal = require("../../models/customerModal");

/**
 * Create a new customer
 * @param {Object} req - Express request object
 * @param {Object} req.body - Customer data (customerName,customerEmail,customerPhoneNumber,customerTableId,)
 * @param {Object} res - Express response message:(Customer registered successfully)
 */
exports.createCustomer = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhoneNumber,
      customerTableId,
    } = req.body;

    await CustomerModal.create({
      customerName,
      customerEmail,
      customerPhoneNumber,
      customerTableId,
    });

    res
      .status(201)
      .json({ success: true, message: "Customer registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Retrieve all customers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await CustomerModal.find().populate("table");
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Retrieve a customer by ID
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Customer ID
 * @param {Object} res - Express response object
 */
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await CustomerModal.findById(req.params.id).populate(
      "table"
    );
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update a customer by ID
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Customer ID
 * @param {Object} req.body - Updated customer data
 * @param {Object} res - Express response object
 */
exports.updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await CustomerModal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("table");
    if (!updatedCustomer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    res.status(200).json({ success: true, data: updatedCustomer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete a customer by ID
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Customer ID
 * @param {Object} res - Express response object
 */
exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await CustomerModal.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCustomer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
