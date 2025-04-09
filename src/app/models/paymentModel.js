const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    billID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Billing",
    },
    paymentMethod: {
        type: String,
        enum: ["Cash", "UPI", "Card", "Other", "Part"],
        required: true,
    }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Payment", paymentSchema);