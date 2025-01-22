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

module.exports = { generateCode };
