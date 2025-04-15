const expressAsyncHandler = require("express-async-handler");
// const {generateOrderId} = require("../../../app/utils/code");

//  Create order send to kitchen
exports.userOrder = expressAsyncHandler (async (req, res) => {

});

// Today Order - Fetch all today's orders
exports.todayOrder = expressAsyncHandler(async (req, res) => {
  const orders = await TodayOrder.find({});
  res.json(orders);
});