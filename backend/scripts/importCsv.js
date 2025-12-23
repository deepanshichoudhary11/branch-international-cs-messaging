const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const Message = require("../models/Message");

const MONGO_URI =
  "mongodb+srv://iec2022013_db_user:Anita1999@cluster0.r2wcaom.mongodb.net/branch_cs";

async function runImport() {
  console.log("🚀 Import started");

  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB");

  const messages = [];

  fs.createReadStream("GeneralistRails_Project_MessageData.csv")
    .pipe(csv())
    .on("data", (row) => {
      if (!row["User ID"] || !row["Message Body"]) return;

      messages.push({
        customerId: row["User ID"],
        message: row["Message Body"],
        priority: /loan|approved|pending|disburse|money|rejected/i.test(
          row["Message Body"]
        )
          ? "HIGH"
          : "LOW",
        status: "NEW",
        createdAt: new Date(row["Timestamp (UTC)"])
      });
    })
    .on("end", async () => {
      console.log(`📦 Total messages to insert: ${messages.length}`);

      await Message.insertMany(messages);
      console.log("✅ ALL messages inserted successfully");

      process.exit(0);
    });
}

runImport().catch((err) => {
  console.error("❌ Import failed:", err);
  process.exit(1);
});
