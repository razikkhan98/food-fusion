const asyncHandler = require("express-async-handler");
const generateOrderID = require("../../utils/generateOrderID");
const menuModel = require("../../models/menuModel");
const TableModal = require("../../models/tableModal");
const TodayOrderModal = require("../../models/todayOrderModal");
const CustomerModal = require("../../models/customerModal");

// Cashier Add Menu
exports.addMenu = asyncHandler(async (req, res, next) => {
  try {
    const { customerUid, floorName, tableNumber, categories } = req.body;

    if (!customerUid || !categories || !Array.isArray(categories)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Find customer by UID to get MongoDB _id
    const customer = await CustomerModal.findOne({ customerUid });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const orderID = await generateOrderID();

    const newMenu = new menuModel({
      customerID: customer._id,
      customerUid,
      floorName,
      tableNumber,
      orderID,
      categories,
    });

    const savedMenu = await newMenu.save();

    // ✅ Update Table Status
    if (tableNumber) {
      await TableModal.findOneAndUpdate(
        { tableNumber },
        { tablestatus: "Order making" },
        { new: true }
      );
    }

    // ✅ Create entry in OrderTable collection
    await OrderTable.create({
      orderID,
      customerID: customer._id,
      floorName,
      tableNumber,
      categories,
      status: "Order making", // Default status when an order is being made
    });

    // ✅ Update TodayOrder entry status
    const todayOrder = await TodayOrderModal.findOne({
      $or: [
        { "dine.customerId": customer._id },
        { "takeaway.customerId": customer._id },
        { "delivery.customerId": customer._id },
      ],
    });

    if (todayOrder) {
      let updated = false;

      todayOrder.dine?.forEach((entry) => {
        if (entry.customerId.toString() === customer._id.toString()) {
          entry.status = "Order making";
          updated = true;
        }
      });

      todayOrder.takeaway?.forEach((entry) => {
        if (entry.customerId.toString() === customer._id.toString()) {
          entry.status = "Order making";
          updated = true;
        }
      });

      todayOrder.delivery?.forEach((entry) => {
        if (entry.customerId.toString() === customer._id.toString()) {
          entry.status = "Order making";
          updated = true;
        }
      });

      if (updated) {
        todayOrder.markModified("dine");
        todayOrder.markModified("takeaway");
        todayOrder.markModified("delivery");
        await todayOrder.save();
      }
    }

    // ✅ Push the menu ID to customer.orders
    customer.orders.push(savedMenu._id);
    await customer.save();

    // ✅ Return full orders by populating the array
    const updatedCustomer = await CustomerModal.findById(customer._id).populate(
      "orders"
    );

    res.status(201).json({ success: true, data: updatedCustomer });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * Retrieve all menu
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllMenu = async (req, res) => {
  try {
    const customerMenu = await menuModel.find();
    res.status(200).json({ success: true, data: customerMenu });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Front

// import React, { useState } from "react";
// import axios from "axios";

// const AddMenuForm = () => {
//   const [formData, setFormData] = useState({
//     customerID: "",
//     floorName: "",
//     tableNumber: "",
//     categories: [
//       {
//         categoriesName: "",
//         subcategories: [
//           {
//             subcategoriesName: "",
//             subcategoriesAmount: 0,
//             subcategoriesType: "",
//             quantity: 1,
//             totalAmount: 0,
//             totalItemTax: 0,
//             discount: "",
//             extraAddon: [
//               {
//                 addonName: "",
//                 addonAmount: 0,
//                 addonQuantity: 0,
//                 addonNotes: "",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/add-menu", formData);
//       alert("Menu Added Successfully!");
//       console.log(res.data);
//     } catch (error) {
//       console.error(error);
//       alert("Error adding menu");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ padding: 20 }}>
//       <h2>Add Menu</h2>

//       <input
//         type="text"
//         placeholder="Customer ID"
//         value={formData.customerID}
//         onChange={(e) => setFormData({ ...formData, customerID: e.target.value })}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Floor Name"
//         value={formData.floorName}
//         onChange={(e) => setFormData({ ...formData, floorName: e.target.value })}
//         required
//       />
//       <input
//         type="number"
//         placeholder="Table Number"
//         value={formData.tableNumber}
//         onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
//         required
//       />

//       <hr />
//       {formData.categories.map((cat, catIndex) => (
//         <div key={catIndex}>
//           <h4>Category</h4>
//           <input
//             type="text"
//             placeholder="Category Name"
//             value={cat.categoriesName}
//             onChange={(e) => {
//               const updated = [...formData.categories];
//               updated[catIndex].categoriesName = e.target.value;
//               setFormData({ ...formData, categories: updated });
//             }}
//             required
//           />

//           {cat.subcategories.map((sub, subIndex) => (
//             <div key={subIndex} style={{ marginLeft: 20 }}>
//               <h5>Subcategory</h5>
//               <input
//                 type="text"
//                 placeholder="Subcategory Name"
//                 value={sub.subcategoriesName}
//                 onChange={(e) => {
//                   const updated = [...formData.categories];
//                   updated[catIndex].subcategories[subIndex].subcategoriesName = e.target.value;
//                   setFormData({ ...formData, categories: updated });
//                 }}
//               />
//               <input
//                 type="number"
//                 placeholder="Amount"
//                 value={sub.subcategoriesAmount}
//                 onChange={(e) => {
//                   const updated = [...formData.categories];
//                   updated[catIndex].subcategories[subIndex].subcategoriesAmount = Number(e.target.value);
//                   setFormData({ ...formData, categories: updated });
//                 }}
//               />
//               {/* Add other subcategory fields similarly */}

//               {sub.extraAddon.map((addon, addonIndex) => (
//                 <div key={addonIndex} style={{ marginLeft: 20 }}>
//                   <h6>Extra Addon</h6>
//                   <input
//                     type="text"
//                     placeholder="Addon Name"
//                     value={addon.addonName}
//                     onChange={(e) => {
//                       const updated = [...formData.categories];
//                       updated[catIndex].subcategories[subIndex].extraAddon[addonIndex].addonName = e.target.value;
//                       setFormData({ ...formData, categories: updated });
//                     }}
//                   />
//                   {/* Add other addon fields similarly */}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       ))}

//       <br />
//       <button type="submit">Submit Menu</button>
//     </form>
//   );
// };

// export default AddMenuForm;

// {
//   "customerID": "661ab9c9d9c3a2d343fbe16f",
//   "floorName": "First Floor",
//   "tableNumber": 5,
//   "categories": [
//     {
//       "categoriesName": "Main Course",
//       "subcategories": [
//         {
//           "subcategoriesName": "Paneer Butter Masala",
//           "subcategoriesAmount": 250,
//           "subcategoriesType": "Veg",
//           "quantity": 2,
//           "totalAmount": 500,
//           "totaliteamTax": 50,
//           "discount": "10%",
//           "extraAddon": [
//             {
//               "addonName": "Extra Cheese",
//               "addonAmount": 30,
//               "addonQuantity": 1,
//               "addonNotes": "Add on top"
//             },
//             {
//               "addonName": "Spicy Sauce",
//               "addonAmount": 20,
//               "addonQuantity": 1,
//               "addonNotes": "Serve separately"
//             }
//           ]
//         },
//         {
//           "subcategoriesName": "Butter Naan",
//           "subcategoriesAmount": 40,
//           "subcategoriesType": "Veg",
//           "quantity": 4,
//           "totalAmount": 160,
//           "totaliteamTax": 16,
//           "extraAddon": []
//         }
//       ]
//     },
//     {
//       "categoriesName": "Drinks",
//       "subcategories": [
//         {
//           "subcategoriesName": "Sweet Lassi",
//           "subcategoriesAmount": 70,
//           "subcategoriesType": "Veg",
//           "quantity": 2,
//           "totalAmount": 140,
//           "totaliteamTax": 14,
//           "discount": "5%",
//           "extraAddon": []
//         }
//       ]
//     }
//   ]
// }
