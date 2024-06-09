import mongoose from "mongoose";

const connection = async () => {
  try {
    const connet = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`database connected${connet.connection.host} `);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connection;
