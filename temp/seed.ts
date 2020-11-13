require("dotenv").config();

import { ObjectId } from "mongodb";
import { connectDatabase } from "../src/database";
import { Review } from "../src/lib/types";

const seed = async () => {
  try {
    console.log("[seed] : running...");

    const db = await connectDatabase();
    const reviews: Review[] = [
      {
        _id: new ObjectId(),
        title: "Clean and fully furnished apartment. 5 min away from CN Tower",
        image:
          "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg",
        body: "A sample paragraph",
        rating: 5
      },
      {
        _id: new ObjectId(),
        title: "Luxurious home with private pool",
        image:
          "https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg",
        body: "new post about nothing",
        rating: 4
      },
      {
        _id: new ObjectId(),
        title: "Single bedroom located in the heart of downtown San Fransisco",
        image:
          "https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg",
        body: "Ut sit amet massa velit. Aliquam id rhoncus nibh. Curabitur malesuada scelerisque nunc vel pulvinar. Sed ornare leo sed nisl eleifend, quis pharetra sem suscipit. Vestibulum sit amet ante pellentesque nisl varius ultricies. Phasellus eu felis turpis. Sed consequat quis nibh eget lacinia. Integer condimentum tincidunt ante, non mattis nisi ultrices quis. Mauris pretium ex at condimentum tincidunt. Proin sed aliquet libero. Nam rutrum dolor diam, vel volutpat ipsum scelerisque at. Donec magna felis, euismod nec vulputate ut, ultrices et nulla. Nulla commodo posuere cursus. Aenean sapien leo, pharetra quis malesuada sed, vulputate in odio.",
        rating: 3
      }
    ];

    for (const review of reviews) {
      await db.reviews.insertOne(review);
    }

    console.log("[seed] : success");
    process.exit();
  } catch {
    throw new Error("failed to seed database");
  }
};

seed();
