import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    // if any connectivity issue happens then you can handle this
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    connection.on("error", (error) => {
      console.log("MongoDB connection error", error);
      process.exit();
    });
  } catch (error) {
    console.error("Something went wrond while connecting to DB");
    console.log(error);
  }
}
