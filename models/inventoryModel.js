let mongoose = require('mongoose')

let inventorySchema = mongoose.Schema({
    inventoryType: {
        type: String,
        required: [true, 'inventory type in required'],
        enum: ['in', 'out']
    },
    bloodGroup: {
        type: String,
        required: [true, 'Blood group is required'],
        enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"]
    },
    quantity: {
        type: String,
        required: [true, "blood quantity is required"]
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'Organization is required']
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: function () {
            return this.inventoryType === "out"
        }
    },
    donar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: function () {
            return this.inventoryType === "in"
        }
    }
}, { timestamps: true })

let inventoryModel = mongoose.model('inventory', inventorySchema)

module.exports = inventoryModel