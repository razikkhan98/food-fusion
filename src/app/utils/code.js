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
  return `${restaurantName.slice(0, 4)}${floorName.slice(0, 4)}${floorNumberStr.slice(0, 2)}`;
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




// Generate order Id
const generateOrderId = async () => {
  const lastOrder = await orderModel.findOne().sort({ createdAt: -1 }); // Get last order
  const lastOrderId = lastOrder ? parseInt(lastOrder.order.replace("ORD", "")) : 1000;
  return `ORD${lastOrderId + 1}`;
};




module.exports = { generateCode, generateFloorUid, generateMenuCode ,generateOrderId};
