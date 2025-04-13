const CustomerModal = require("../../models/customerModal");
const floorModal = require("../../models/floorModal");
const TableModal = require("../../models/tableModal");
const menuModel = require("../../models/menuModel");
const { generateCustomerUid } = require("../../../app/utils/code");

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
      customerNumber,
      orderType,
      customerStatus,
      tableNumber,
      deliveryAddress,
      floorUid,
      tableId,
      menuId 
    } = req.body;

    if (!orderType) {
      return res.status(400).json({ success: false, message: "All fields are required" });
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
    
    // Generate a unique UID
    const customerUid = generateCustomerUid(customerName, customerNumber);
    
    // Check if floor already exists
    const existingCustomer = await CustomerModal.findOne({ customerUid });
    
    if (existingCustomer) {
      return res.status(400).json({success: false, message: "Customer already exists."});
    }
    
    // Check if floor exists 
    const floor = await floorModal.findOne({floorUid});
    if (!floor) {
      return res.status(404).json({ message: "floorUid not found." });
    }
    console.log(floor)

      //Check if table already exists
      const table = await TableModal.findById(tableId);
      if(!table){
        return res.status(400).json({message:"TAble ID not found!"});
      }

      //Check if Menu already exists
      const existingMenu = await menuModel.findById(menuId);
      if(!existingMenu){
         return res.status(400).json({message: "Menu ID not found!"});
      }

    // Add new costomer
    const customer = await CustomerModal.create({
      customerName,
      customerEmail,
      customerNumber,
      orderType,
      customerStatus,
      tableNumber: orderType === "Dine in" ? tableNumber : null,
      deliveryAddress: orderType === "Delivery" ? deliveryAddress : null,
      floorUid,
      customerUid,
      tableId,
      menuId
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
    const customers = await CustomerModal.find().populate("tables").populate("floorUid");
    res.status(200).json({ success: true, count: customers.length, data: customers });
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
    const customer = await CustomerModal.findById(req.params.id).populate("tables");
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
