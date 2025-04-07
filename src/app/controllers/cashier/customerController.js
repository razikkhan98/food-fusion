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
      // tableId,
      orderType,
      customerStatus,
      tableNumber,
      deliveryAddress
    } = req.body;

    if (!orderType) {
      return res
        .status(404)
        .json({ success: false, message: "All fields are required" });
    }

    // Validate order type
    if (orderType === 'Dine in' && !tableNumber) {
      return res.status(400).json({ message: "Table number is required for dine-in orders" });
    }

    if (orderType === 'Delivery' && !deliveryAddress) {
      return res.status(400).json({ message: "Address is required for delivery orders" });
    }


    // If orderType is "Dine in", check if the tableNumber already exists
    if (orderType === 'Dine in') {
      const existingTable = await TableModal.findOne({ tableNumber });
      console.log(existingTable);

      if (existingTable && existingTable.status === 'reserved') {
        return res.status(400).json({ message: "This table is already reserved" });
      }
    }

    // Add new costomer
    const customer = await CustomerModal.create({
      customerName,
      customerEmail,
      customerPhoneNumber,
      // tableId,
      orderType,
      customerStatus,
      tableNumber: orderType === "Dine in" ? tableNumber : null,
      deliveryAddress: orderType === "Delivery" ? deliveryAddress : null,
    });
    await customer.save();


    // const table = await TableModal.findById({ _id: tableId });
    // console.log("findTable: ", table);

    // if (customer?._id) table.customerId = customer?._id;
    // if (customer?.orderType === "Dine in") table.tableStatus = "Reserved";


    // If Dine in order, update the table status to 'reserved'
    if (orderType === 'Dine in' && tableNumber) {
      const table = await TableModal.findOneAndUpdate(
        { tableNumber },
        { status: 'reserved', customerId: customer._id }, // Mark table as reserved and link it to the customer
        { new: true }
      );
    }


    res.status(201).json({ success: true, message: "Customer registered successfully", data: customer });
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
    const customer = await CustomerModal.findById(req.params.id).populate("tableId");
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
