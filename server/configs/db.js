import mongoose from "mongoose";

const connectDB = async () => {

    try {
        mongoose.connection.on('connected', () => console.log("Database Connected Successfully"));
        mongoose.connection.on('error', (err) => console.error("MongoDB Connection Error:", err));

        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }

};

export default connectDB;
// Note: Do not use the '@' symbol in your database user's password.