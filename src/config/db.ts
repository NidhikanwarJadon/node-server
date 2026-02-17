import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
	try {
		await mongoose.connect(
			process.env.MONGO_URL ||
				"mongodb://mongoadmin:mongopass_123@localhost:27017/node_learning?authSource=admin",
		);
		console.log("✅ MongoDB connected (mongoose)");
	} catch (err) {
		console.error("❌ MongoDB connection error:", err);
		process.exit(1);
	}
};

export default connectDB;
