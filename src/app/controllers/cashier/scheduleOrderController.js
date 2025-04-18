const asyncHandler = require("express-async-handler");
const scheduleOrder = require("../../models/scheduleOrderModel");
// const moment = require("moment");
// const cron = require("node-cron");

// Create a new order
exports.addScheduleOrder = asyncHandler(async (req, res) => {
    try {
        const {
            customerName,
            customerEmail,
            customerNumber,
            selectDate,
            selectTime,
            orderType,
            floor
        } = req.body;

        // Validation
        if (!customerName ||
            !customerNumber ||
            !selectDate ||
            !selectTime ||
            !orderType ){
                return res.status(400).json({ message: 'All fields are required.' });
            }
            
             // If order type Din in , add floor
            if (orderType === "Dine in" && !floor) {
                return res.status(400).json({ message: "Dine in orders must include a floor." });
            }
            
             // Combine date & time
             // const scheduledDateTime = moment(`${selectDate} ${selectTime}`, "YYYY-MM-DD HH:mm").toDate();
        
             const scheduledDateTime = new Date(`${selectDate}T${selectTime}`);

        //   // ✅ 1 hour before alert 
          const reminderTime = new Date(scheduledDateTime.getTime() - 10 * 60 * 1000);
          const now = new Date();
          const delay = reminderTime.getTime() - now.getTime();

          if (delay > 0) {
            console.log(`✅ Reminder set for ${customerName} at ${selectTime}`);
              setTimeout(() => {
                  console.log(`🔔 [ALERT] Order for ${customerName} is scheduled in 1 hour at ${selectTime}`);
                }, delay);
            } 
            else {
                console.log(`⚠️ Scheduled time already passed or is less than 30 min away.`);
            }


            // Create new Schedule Order
            const schedule = await scheduleOrder.create({
                customerName,
                customerNumber,
                customerEmail,
                selectDate,
                selectTime,
                orderType,
                floor: orderType === "Dine in" ? floor : undefined,
                // scheduledDateTime
            });
            
   
        res.status(201).json({
            message: 'Order scheduled successfully!',
            data: schedule
        });

    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({ success: false, message: error.message });
    }
});



// Get All Schedule Order
exports.getAllScheduleOrder = asyncHandler(async (req, res) => {
    try {
        const scheduleOrder = await scheduleOrder.find();
        res.status(200).json({ success: true, data: scheduleOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});