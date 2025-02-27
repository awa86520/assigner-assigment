const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Item = require("./models/itemModel");
 // here i am insering data in databse 

const sampleItems = [
  { name: "Item A", price: 50 },
  { name: "Item B", price: 20 },
  { name: "Item C", price: 40 },
  { name: "Item D", price: 30 },
  { name: "Item E", price: 10 },
  { name: "Item F", price: 60 },
  { name: "Item G", price: 80 },
  { name: "Item H", price: 90 },
  { name: "Item I", price: 70 },
  { name: "Item J", price: 100 }
];

const seedDB = async () => {
  try {
    await connectDB();
    await Item.deleteMany();
    await Item.insertMany(sampleItems);
    console.log("✅ Sample Data Inserted");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

if (require.main === module) {
  seedDB();
}