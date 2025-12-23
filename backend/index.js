const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://iec2022013_db_user:Anita1999@cluster0.r2wcaom.mongodb.net/branch_cs?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("Mongo error:", err));

io.on("connection", (socket) => {
  console.log("Agent connected:", socket.id);
});

app.get("/", (req, res) => {
  res.send("Branch CS Backend Running");
});

app.use("/api/messages", require("./routes/messages"));

server.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
