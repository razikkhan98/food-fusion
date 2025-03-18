const mongoose = require('mongoose');

const previousOrderSchema = mongoose.Schema(
{
    customerName:{
        type: String,
        required: true
    },
    customerNumber:{
        type: Number,
        required: true
    },
    customerEmail:{
        type: String,
        required: true
    },
    deliveryAddress:{
        type:String,
        required: true
    },
    customerStatus:{
        type:String,
        required: true
    },
    ordeDate:{
        type:String
    },
    orderTime:{
        type:String
    },
    fullMenus:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "menus",
        default: null
    }
});

module.exports = mongoose.model('PreviousOrder', previousOrderSchema);
