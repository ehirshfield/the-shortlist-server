require("dotenv").config();

import { ObjectId } from "mongodb";
import { connectDatabase } from "../src/database";
import { Review, User, ReviewType } from "../src/lib/types";

const users: User[] = [
  {
    _id: "5d378db94e84753160e08b55",
    token: "token_************",
    name: "Eric H.",
    avatar:
      "https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560648533/mock/users/user-profile-1_mawp12.jpg",
    contact: "eric@money.com",
    reviews: [
      new ObjectId("5d378db94e84753160e08b31"),
      new ObjectId("5d378db94e84753160e08b4b"),
      new ObjectId("5d378db94e84753160e08b4c")
    ]
  },
  {
    _id: "5d378db94e84753160e08b56",
    token: "token_************",
    name: "Tom F.",
    avatar:
      "https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560649052/mock/users/user-profile-2_arwtdy.jpg",
    contact: "tom@folker.com",
    reviews: [
      new ObjectId("5d378db94e84753160e08b37"),
      new ObjectId("5d378db94e84753160e08b38")
    ]
  },
  {
    _id: "5d378db94e84753160e08b57",
    token: "token_************",
    name: "Spenser B.",
    avatar:
      "https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560649052/mock/users/user-profile-2_arwtdy.jpg",
    contact: "spenser@yeti.com",
    reviews: [
      new ObjectId("5d378db94e84753160e08b3a")
    ]
  }
];

const reviews: Review[] = [
  {
    _id: new ObjectId('5d378db94e84753160e08b31'),
    title: "Chana Masala by J. Kenji Lopez-Alt",
    image:
      "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg",
    body: "A sample paragraph Ut sit amet massa velit. Aliquam id rhoncus nibh. Curabitur malesuada scelerisque nunc vel pulvinar. Sed ornare leo sed nisl eleifend, quis pharetra sem suscipit. Vestibulum sit amet ante pellentesque nisl varius ultricies. Phasellus eu felis turpis. Sed consequat quis nibh eget lacinia. Integer condimentum tincidunt ante, non mattis nisi ultrices quis. Mauris pretium ex at condimentum tincidunt. Proin sed aliquet libero. Nam rutrum dolor diam, vel volutpat ipsum scelerisque at. Donec magna felis, euismod nec vulputate ut, ultrices et nulla. Nulla commodo posuere cursus. Aenean sapien leo, pharetra quis malesuada sed, vulputate in odio.",
    rating: 7,
    author: 'Eric',
    type: ReviewType.Recipe,
    url: 'https://www.seriouseats.com/recipes/2016/04/channa-masala-recipe.html'
  },
  {
    _id: new ObjectId('5d378db94e84753160e08b4b'),
    title: "Shakshuka from NYT Cooking",
    image:
      "https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg",
    body: "new post about nothing",
    rating: 9,
    author: 'Eric',
    type: ReviewType.Recipe,
    url: 'https://cooking.nytimes.com/recipes/1014721-shakshuka-with-feta'
  },
  {
    _id: new ObjectId('5d378db94e84753160e08b37'),
    title: "McDonalds on 3rd Street",
    image:
      "https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg",
    body: "Ut sit amet massa velit. Aliquam id rhoncus nibh. Curabitur malesuada scelerisque nunc vel pulvinar. Sed ornare leo sed nisl eleifend, quis pharetra sem suscipit. Vestibulum sit amet ante pellentesque nisl varius ultricies. Phasellus eu felis turpis. Sed consequat quis nibh eget lacinia. Integer condimentum tincidunt ante, non mattis nisi ultrices quis. Mauris pretium ex at condimentum tincidunt. Proin sed aliquet libero. Nam rutrum dolor diam, vel volutpat ipsum scelerisque at. Donec magna felis, euismod nec vulputate ut, ultrices et nulla. Nulla commodo posuere cursus. Aenean sapien leo, pharetra quis malesuada sed, vulputate in odio.",
    rating: 5,
    author: 'Tom',
    type: ReviewType.Restaurant,
    city: 'San Diego',
    address: '123 Fake Street'
  },
  {
    _id: new ObjectId('5d378db94e84753160e08b38'),
    title: "The Combination Taco Bell and Pizza Hut",
    image:
      "https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg",
    body: "Ut sit amet massa velit. Aliquam id rhoncus nibh. Curabitur malesuada scelerisque nunc vel pulvinar. Sed ornare leo sed nisl eleifend, quis pharetra sem suscipit. Vestibulum sit amet ante pellentesque nisl varius ultricies. Phasellus eu felis turpis. Sed consequat quis nibh eget lacinia. Integer condimentum tincidunt ante, non mattis nisi ultrices quis. Mauris pretium ex at condimentum tincidunt. Proin sed aliquet libero. Nam rutrum dolor diam, vel volutpat ipsum scelerisque at. Donec magna felis, euismod nec vulputate ut, ultrices et nulla. Nulla commodo posuere cursus. Aenean sapien leo, pharetra quis malesuada sed, vulputate in odio.",
    rating: 10,
    author: 'Tom',
    type: ReviewType.Restaurant,
    city: 'San Diego',
    address: '1234 Fake Street'
  },
  {
    _id: new ObjectId('5d378db94e84753160e08b4c'),
    title: "Great China",
    image:
      "https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg",
    body: "Ut sit amet massa velit. Aliquam id rhoncus nibh. Curabitur malesuada scelerisque nunc vel pulvinar. Sed ornare leo sed nisl eleifend, quis pharetra sem suscipit. Vestibulum sit amet ante pellentesque nisl varius ultricies. Phasellus eu felis turpis. Sed consequat quis nibh eget lacinia. Integer condimentum tincidunt ante, non mattis nisi ultrices quis. Mauris pretium ex at condimentum tincidunt. Proin sed aliquet libero. Nam rutrum dolor diam, vel volutpat ipsum scelerisque at. Donec magna felis, euismod nec vulputate ut, ultrices et nulla. Nulla commodo posuere cursus. Aenean sapien leo, pharetra quis malesuada sed, vulputate in odio.",
    rating: 9,
    author: 'Eric',
    type: ReviewType.Restaurant,
    city: 'Berkeley',
    address: '123 Uni Street'
  },
  {
    _id: new ObjectId('5d378db94e84753160e08b3a'),
    title: "Golden Corral",
    image:
      "https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg",
    body: "Ut sit amet massa velit. Aliquam id rhoncus nibh. Curabitur malesuada scelerisque nunc vel pulvinar. Sed ornare leo sed nisl eleifend, quis pharetra sem suscipit. Vestibulum sit amet ante pellentesque nisl varius ultricies. Phasellus eu felis turpis. Sed consequat quis nibh eget lacinia. Integer condimentum tincidunt ante, non mattis nisi ultrices quis. Mauris pretium ex at condimentum tincidunt. Proin sed aliquet libero. Nam rutrum dolor diam, vel volutpat ipsum scelerisque at. Donec magna felis, euismod nec vulputate ut, ultrices et nulla. Nulla commodo posuere cursus. Aenean sapien leo, pharetra quis malesuada sed, vulputate in odio.",
    rating: 8,
    author: 'Eric',
    type: ReviewType.Restaurant,
    city: 'New York City',
    address: '123 Pizza Street'
  }
];

const seed = async () => {
  try {
    console.log("[seed] : running...");

    const db = await connectDatabase();
    

    for (const review of reviews) {
      await db.reviews.insertOne(review);
    }

    for (const user of users) {
      await db.users.insertOne(user);
    }

    console.log("[seed] : success");
    process.exit();
  } catch(err) {
    console.error(err)
    throw new Error("failed to seed database");
  }
};

seed();