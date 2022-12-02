const mongoose = require("mongoose");

exports.connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`, error);
        process.exit(1);
    }
};
