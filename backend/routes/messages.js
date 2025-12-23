const router = require("express").Router();
const Message = require("../models/Message");

// ================================
// GET all messages
// ================================
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// ================================
// CREATE new customer message
// ================================
router.post("/", async (req, res) => {
  try {
    const urgentKeywords = ["loan", "approved", "pending", "money", "disburse"];

    const isUrgent = urgentKeywords.some(word =>
      req.body.message.toLowerCase().includes(word)
    );

    const message = await Message.create({
      customerId: req.body.customerId,
      message: req.body.message,
      priority: isUrgent ? "HIGH" : "LOW"
    });

    // Emit real-time update (optional)
    if (req.app.get("io")) {
      req.app.get("io").emit("new_message", message);
    }

    res.json(message);
  } catch (err) {
    res.status(500).json({ error: "Failed to create message" });
  }
});

// ================================
// REPLY to message (RESOLVE)
// ================================
router.post("/:id/reply", async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      {
        reply: req.body.reply,
        status: "RESOLVED"
      },
      { new: true }
    );

    if (req.app.get("io")) {
      req.app.get("io").emit("message_updated", updatedMessage);
    }

    res.json(updatedMessage);
  } catch (err) {
    res.status(500).json({ error: "Failed to save reply" });
  }
});

module.exports = router;
