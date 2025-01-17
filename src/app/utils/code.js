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

const generateCode = (role, mobileNum, role_id) => {
  const rolePrefix = role.slice(0, 2).toUpperCase(); // First two characters of the role in uppercase
  const fullMobile = String(mobileNum); // Convert mobile number to a string

  // Ensure role_id is a two-digit string with leading zeros if necessary
  const roleIdPart = String(role_id).padStart(2, "0");

  // Combine role prefix, role_id, and full mobile number
  return `${roleIdPart}${rolePrefix}${fullMobile}`;
};

module.exports = {
  generateCode,
};
