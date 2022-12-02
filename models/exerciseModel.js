const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: new Date(),
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("Exercise", exerciseSchema);

module.exports = User;
