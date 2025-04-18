const mongoose = require("mongoose");

const scheduleOrderSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
            trim: true,
        },
        customerEmail: {
            type: String,
            // unique: true,
            trim: true,
            match: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        },
        customerNumber: {
            type: String,
            trim: true,
            required: true,
            match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
            minlength: 10,
            maxlength: 10,
        },
        selectDate: {
            type: String,
            required: true
        }, 
        selectTime: {
            type: String,
            required: true  
        },
        orderType: {
            type: String,
            required: true, 
            // default: "Dine in",
            enum: ["Dine in", "Take away", "Delivery"],
        },
        floor: {
            type: String,
        },
        scheduledDateTime: {
            type: Date
          }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("ScheduleOrder", scheduleOrderSchema);
