const CustomerModal = require("../../models/customerModal");
const floorModal = require("../../models/floorModal");
const TableModal = require("../../models/tableModal");
const menuModel = require("../../models/menuModel");
const TodayOrderModal = require("../../models/todayOrderModal");

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
      floorName,
      tableNumber,
      deliveryAddress,
    } = req.body;

    if (!orderType) {
      return res
        .status(400)
        .json({ success: false, message: "Order type is required" });
    }

    if (orderType === "Dine in" && !tableNumber) {
      return res
        .status(400)
        .json({ message: "Table number is required for dine-in orders" });
    }

    if (orderType === "Delivery" && !deliveryAddress) {
      return res
        .status(400)
        .json({ message: "Delivery address is required for delivery orders" });
    }

    // Validate dine-in table
    let table = null;
    if (orderType === "Dine in") {
      table = await TableModal.findOne({ tableNumber, floorName });

      if (!table) {
        return res
          .status(404)
          .json({ message: "Table not found on the specified floor." });
      }

      if (
        table.tablestatus === "Order pending" ||
        table.tablestatus === "reserved"
      ) {
        return res
          .status(400)
          .json({ message: "This table is already in use." });
      }
    }

    // Generate UID and check duplication
    const customerUid = generateCustomerUid(customerName, customerNumber);
    // const existingCustomer = await CustomerModal.findOne({ customerUid });

    // if (existingCustomer) {
    //   return res.status(400).json({ success: false, message: "Customer already exists." });
    // }

    // Create new customer
    const customer = await CustomerModal.create({
      customerName,
      customerEmail,
      customerNumber,
      orderType,
      tableNumber: orderType === "Dine in" ? tableNumber : null,
      deliveryAddress: orderType === "Delivery" ? deliveryAddress : null,
      floorName,
      customerUid,
    });

    // Save customer
    await customer.save();

    // Create today's order if not exists
    let todayOrder = await TodayOrderModal.findOne().sort({ createdAt: -1 });

    if (!todayOrder) {
      todayOrder = new TodayOrderModal({});
    }

    const orderEntry = {
      customerUid: customerUid,
      customerId: customer._id,
      customerName: customer.customerName,
      tableNumber: customer.tableNumber || null,
      deliveryAddress: customer.deliveryAddress || null,
      menuId: customer.menuId,
    };

    if (orderType === "Dine in") {
      todayOrder.dine.push(orderEntry);

      // Optional: Update table status
      await TableModal.findOneAndUpdate(
        { tableNumber },
        { tablestatus: "Order pending", customerId: customer._id }
      );
    } else if (orderType === "Take away") {
      todayOrder.takeaway.push(orderEntry);
    } else if (orderType === "Delivery") {
      todayOrder.delivery.push(orderEntry);
    }

    await todayOrder.save();

    res.status(201).json({
      success: true,
      message: "Customer registered successfully",
      data: customer,
    });
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
    const customers = await CustomerModal.find()
      .populate("tables")
      // .populate("floorUid");
    res
      .status(200)
      .json({ success: true, count: customers.length, data: customers });
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
      "tables"
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
