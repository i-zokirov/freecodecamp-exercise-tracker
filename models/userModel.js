const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: "string",
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
