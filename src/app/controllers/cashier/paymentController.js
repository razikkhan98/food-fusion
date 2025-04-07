const asyncHandler = require("express-async-handler");
const paymentModel = require("../../../app/models/paymentModel");
const billModel = require("../../models/billModel");

exports.userPayment = asyncHandler(async (req, res) => {
    const {
        billID,
        paymentMethod,
    } = req.body;

    try {
        // Validation
        if (!billID || !paymentMethod) {
            return res.status(200).json({ message: "All fields are required" });
        }

        const bill = await billModel.findById(billID)
        if (!bill) {
            return res.status(200).json({ message: "Bill ID is not found!" });
        }

        const newPayment = await paymentModel.create({
            billID,
            paymentMethod
        });

        res.status(201).json({
            success: true,
            message: "Payment successfully",
            data: newPayment,
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error creating order", 
            error: error.message });
    }
});


// Get All Payment
exports.getAllPayments = asyncHandler(async (req, res) => {
    try {
      const payments = await paymentModel.aggregate([
        {
          $lookup: {
            from: "billings",
            localField: "billID",
            foreignField: "_id",
            as: "billingDetails",
          },
        },
        { $unwind: "$billingDetails" },
      ]);
  
      res.status(200).json({
        success: true,
        totalPayments: payments.length,
        message: "Payments retrieved successfully",
        data: payments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving payments",
        error: error.message,
      });
    }
  });