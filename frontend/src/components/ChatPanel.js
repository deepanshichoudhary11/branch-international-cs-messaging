import { useState } from "react";
import axios from "axios";

const cannedReplies = [
  "Your loan is currently under review. Please allow 24–48 hours.",
  "Thank you for reaching out. Your payment has been received.",
  "We’re sorry for the inconvenience. Our team is looking into this.",
  "Please ensure your account details are up to date and try again.",
  "Your request has been escalated to the relevant team."
];

export default function ChatPanel({ message, onResolved }) {
  const [reply, setReply] = useState("");
  const [sent, setSent] = useState(false);

  if (!message) {
    return (
      <div className="chat-panel">
        <h3>Customer Context</h3>
        <p>Select a message to view details</p>
      </div>
    );
  }

  const sendReply = async () => {
  if (!reply.trim()) {
    alert("Please enter or select a reply");
    return;
  }

  await axios.post(
    `http://localhost:5000/api/messages/${message._id}/reply`,
    { reply }
  );

  setReply("");
  setSent(true);

  // notify parent to refresh lists
  setTimeout(() => {
    onResolved();
  }, 500);
};


  return (
    <div className="chat-panel">
      <h3>User {message.customerId}</h3>
      <p><b>Priority:</b> {message.priority}</p>
      <p><b>Status:</b> {sent ? "RESOLVED ✅" : message.status}</p>

      <p style={{ marginTop: 10 }}>
        <b>Message:</b><br />
        {message.message}
      </p>

      <label style={{ marginTop: 20 }}>Canned Replies</label>
      <select
        onChange={e => setReply(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px" }}
      >
        <option value="">Select a response</option>
        {cannedReplies.map((text, idx) => (
          <option key={idx} value={text}>{text}</option>
        ))}
      </select>

      <div style={{ display: "flex", marginTop: "auto" }}>
        <input
          value={reply}
          onChange={e => setReply(e.target.value)}
          placeholder="Type reply..."
        />
        <button onClick={sendReply}>Send</button>
      </div>
    </div>
  );
}
