// const orderModel = require("../../app/models/orderModal");
/**
 * Generates a unique code based on the role, mobile number, and role ID.
 *
 * @param {string} role - The role of the user (e.g., "Admin", "Cashier").
 * @param {number} mobileNum - The user's mobile number.
 * @param {number} role_id - The numerical ID associated with the role.
 * @returns {string} The generated code in the format `<roleIdPart><rolePrefix><mobileNum>`.
 *
 * Example:
 * - role: "Admin", mobileNum: 9876543210, role_id: 1
 * - Output: "01AD9876543210"
 */
const generateCode = (role, sequence, mobileNum) => {
  const roleMapping = {
    Admin: "AD",
    Cashier: "CA",
    Staff: "ST",
    Captain: "CP",
    Chef: "CH",
  };
  const fullMobile = String(mobileNum);
  const roleCode = roleMapping[role];
  const paddedSequence = sequence.toString().padStart(2, "0");
  return `${paddedSequence}${roleCode}${fullMobile}`;
};


// Generate Floor uid 
// Example :- zomaSec2  
const generateFloorUid = (restaurantName, floorName, floorNumber) => {
const floorNumberStr = String(floorNumber);
const uid =`${restaurantName.slice(0, 4)}${floorName.slice(0, 3)}${floorNumberStr.slice(0, 2)}`;
return uid.toLowerCase();
};


// Generate Menu Code
const generateMenuCode = (name) => {
  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error('Invalid menu name');
  }

  const words = name.split(' ').filter(word => word.length > 0);  
  const code = words.length >= 2 ? `${words[0][0]} ${words[1][0]}` : words[0][0]; // Use first letters of the first two words
  return code.toUpperCase();  //  The code in uppercase (e.g., "C P")
};




// // Generate order Id

// const generateOrderId = async () => {
  
//   const counter = await orderModel.findByIdAndUpdate(
//     { _id: 'orderID' },
//     { $inc: { sequence_value: 1 } }, // Atomic increment
//     { new: true, upsert: true }      // Create if not exists
//   );
// console.log(counter);
//   return `ORD${counter.sequence_value}`
// };

// generateOrderId
module.exports = { generateCode, generateFloorUid, generateMenuCode };
