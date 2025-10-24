import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
  //   async function checkDB() {
  //     await mongoose.connect(process.env.MONGO_URI);
  //     const dbs = await mongoose.connection.db.admin().listDatabases();
  //     console.log(dbs);
  //   }
  //   checkDB();
};
export default connectDB;
