// const cron = require("node-cron");
// const ScheduleOrder = require("../models/scheduleOrderModel");
// const moment = require("moment");

// // Run every 5 minutes
// cron.schedule("/30 /15 /18 /4  *", async () => {
//     try {
//         const now = moment();
//         const oneHourLater = moment().add(1, 'hour');

//         const ordersToAlert = await ScheduleOrder.find({
//             scheduledDateTime: {
//                 $gte: oneHourLater.startOf('minute').toDate(),
//                 $lt: oneHourLater.endOf('minute').toDate()
//             }
//         });
// console.log(now);
//         ordersToAlert.forEach(order => {
//             console.log(`🔔 ALERT: Upcoming order for ${order.customerName} at ${order.scheduledDateTime}`);
//             // Optional: Send SMS/Email here
//         });
//     } catch (err) {
//         console.error("❌ Cron error:", err);
//     }
// });
