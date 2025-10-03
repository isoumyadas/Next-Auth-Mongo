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
      process.exit(1);
    });
  } catch (error) {
    console.error("Something went wrond while connecting to DB");
    console.log(error);
  }
}

// process.exit(0) or process.exit()
// Exits the application with a "success" status code, signaling a clean termination.

// process.exit(1)
// Exits the application with a "failure" status code, signaling a critical error to the operating system or parent process.
