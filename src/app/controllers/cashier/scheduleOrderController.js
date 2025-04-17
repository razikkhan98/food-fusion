const asyncHandler = require("express-async-handler");
const scheduleOrder = require("../../models/scheduleOrderModel");
const moment = require("moment");

// Create a new order
exports.addScheduleOrder = asyncHandler(async (req, res) => {
    try {
        const {
            customerName,
            customerEmail,
            customerNumber,
            customerDate,
            customerTime,
            orderType,
            floor
        } = req.body;

        // Validation
        if (!customerName ||
            !customerNumber ||
            !customerDate ||
            !customerTime 
            // !orderType 
        ){
                return res.status(400).json({ message: 'All fields are required.' });
            }
            
            // If order type Din in , add members and floors
            let dinInData = {};
            if (orderType === "Dine in"){
                if (!floor){
                    return res. status(400).json({message: "Dine in order is required floor."})
                }
                dinInData = { floor }
            }
            
             // Combine date & time
        const scheduledDateTime = moment(`${customerDate} ${customerTime}`, "YYYY-MM-DD HH:mm").toDate();

          // ✅ 1 hour before alert logic
          const oneHourBefore = new Date(scheduledDateTime.getTime() - 60 * 60 * 1000);
          const now = new Date();
          const delay = oneHourBefore.getTime() - now.getTime();
  
          if (delay > 0) {
              setTimeout(() => {
                  console.log(`🔔 [ALERT] Order for ${customerName} is scheduled in 1 hour at ${customerTime}`);
                  // You can also send email/SMS here
              }, delay);
          } else {
              console.log(`⚠️ Scheduled time already passed or too close.`);
          }
            
            // Create new Schedule Order
            const schedule = await scheduleOrder.create({
                customerName,
                customerNumber,
                customerEmail,
                customerDate,
                customerTime,
                orderType,
                floor,
                scheduledDateTime
            });
            console.log(schedule);

        await schedule.save();

        res.status(201).json({
            message: 'Order scheduled successfully!',
            data: schedule
        });

    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({ success: false, message: error.message });
    }
});