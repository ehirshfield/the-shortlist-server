require("dotenv").config();

import { connectDatabase } from "../src/database";

const clear = async () => {
    try {
      console.log("[clear] : running...");
  
      const db = await connectDatabase();

      const users = await db.users.find({}).toArray();
      const reviews = await db.reviews.find({}).toArray();
      
      if (users.length > 0) {
        await db.users.drop()
      }

      if (reviews.length > 0) {
        await db.reviews.drop()
      }
  
      console.log("[clear] : success");
      process.exit();
    } catch(err) {
      console.error(err)
      throw new Error("failed to clear database");
    }
  };
  
  clear();