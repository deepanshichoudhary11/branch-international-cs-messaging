const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
      index: true // helps search performance
    },

    message: {
      type: String,
      required: true
    },

    priority: {
      type: String,
      enum: ["HIGH", "LOW"],
      default: "LOW"
    },

    status: {
      type: String,
      enum: ["NEW", "IN_PROGRESS", "RESOLVED"],
      default: "NEW"
    },

    reply: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true // adds createdAt + updatedAt automatically
  }
);

module.exports = mongoose.model("Message", MessageSchema);
