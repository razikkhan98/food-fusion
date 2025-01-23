const CustomerModal = require("../../models/customerModal");
const TableModal = require("../../models/tableModal");

/**
 * Create a new customer
 * @param {Object} req - Express request object
 * @param {Object} req.body - Customer data (customerName,customerEmail,customerPhoneNumber,customerTableId)
 * @param {Object} res - Express response message:(Customer registered successfully)
 */
exports.createCustomer = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhoneNumber,
      tableId,
      customerStatus,
      orderType,
    } = req.body;

    if (!orderType) {
      return res
        .status(404)
        .json({ success: false, message: "All fields are required" });
    }

    const customer = await CustomerModal.create({
      customerName,
      customerEmail,
      customerPhoneNumber,
      tableId,
      customerStatus,
      orderType,
    });

    const table = await TableModal.findById({ _id: tableId });
    console.log("findTable: ", table);

    if (customer?._id) table.customerId = customer?._id;
    if (customer?.orderType === "Dine in") table.tableStatus = "Reserved";
    await table.save();
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
    const customers = await CustomerModal.find().populate("tableId");
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
