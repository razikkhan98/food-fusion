import { getAllTable } from "../controllers/cashier/tableController";

const actionCodes = {
  CCO: "Cancelled",
  RES: "Reserved",
  AVAIL: "Available",
  OCC: "Occupied",
  CMP: "Completed",
};

export const updateTableStatus = (table, actionCode) => {
  table?.status = actionCodes[actionCode];
  if (actionCode === "CCO") table?.currentOrder = null;
  return table;
};


/**
 * example
 * */
// const table = {
//   tableId: "T4",
//   status: "Occupied",
//   currentOrder: { orderId: "O124" },
// };
// const updatedTable = updateTableStatus(table, "CCO");
// console.log(updatedTable);





function performTaskByActionsCode(actionCodes, task, key = null, value = null) {
  switch (task) {
    case "getValue":
      return actionCodes[key] || `Key "${key}" not found.`;

    case "addCode":
      if (key && value) {
        actionCodes[key] = value;
        return `Added ${key}: "${value}" successfully.`;
      }
      return "Key and value are required to add a new code.";

    case "removeCode":
      if (key && actionCodes[key]) {
        delete actionCodes[key];
        return `Removed code "${key}" successfully.`;
      }
      return `Key "${key}" not found.`;

    case "getAllKeys":
      return Object.keys(actionCodes);

    case "getAllValues":
      return Object.values(actionCodes);

    case "keyExists":
      return key in actionCodes;

    default:
      return "Invalid task specified.";
  }
}
