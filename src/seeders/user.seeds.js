require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const connectDB = require("../config/database");

const users = [
  {
    userName: "John Doe",
    accountNumber: "123456789",
    emailAddress: "johndoe@gmail.com",
    identityNumber: "ID12345",
  },
  {
    userName: "Jane Smith",
    accountNumber: "987654321",
    emailAddress: "janesmith@gmail.com",
    identityNumber: "ID54321",
  },
  {
    userName: "Alice Johnson",
    accountNumber: "111222333",
    emailAddress: "alicejohnson@gmail.com",
    identityNumber: "ID11111",
  },
];

const seedUsers = async () => {
  await connectDB();

  try {
    await User.deleteMany();

    await User.insertMany(users);

    console.log("Data successfully seeded");
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding data: ${error}`);
    process.exit(1);
  }
};

seedUsers();
