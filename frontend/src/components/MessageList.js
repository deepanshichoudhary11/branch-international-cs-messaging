import { useEffect, useState } from "react";
import axios from "axios";

export default function MessageList({ onSelect, filter, refreshKey }) {

  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
  axios.get("http://localhost:5000/api/messages")
    .then(res => setMessages(res.data));
}, [refreshKey]);


  let filtered = messages;

  if (filter === "URGENT") filtered = filtered.filter(m => m.priority === "HIGH");
  if (filter === "RESOLVED") filtered = filtered.filter(m => m.status === "RESOLVED");

  filtered = filtered.filter(m =>
    m.message.toLowerCase().includes(search.toLowerCase()) ||
    String(m.customerId).includes(search)
  );

  return (
    <div className="message-list">
      <h3>Incoming Messages</h3>

      <input
        placeholder="Search by customer or message..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* EMPTY STATES */}
      {filtered.length === 0 && (
        <div className="empty-state">
          {filter === "URGENT" && "🎉 No urgent messages. All caught up!"}
          {filter === "RESOLVED" && "No resolved messages yet."}
          {filter === "ALL" && "No messages found."}
        </div>
      )}

      {filtered.map(msg => (
        <div
          key={msg._id}
          className={`message-card
            ${msg.priority === "HIGH" ? "urgent-accent" : ""}
            ${selectedId === msg._id ? "selected-card" : ""}`}
          onClick={() => {
            setSelectedId(msg._id);
            onSelect(msg);
          }}
        >
          <div className="card-header">
            <strong>User {msg.customerId}</strong>

            {/* STATUS PILL */}
            <span className={`status-pill ${msg.status.toLowerCase()}`}>
              {msg.status}
            </span>
          </div>

          <p className="preview">{msg.message.slice(0, 80)}...</p>

          <span className={msg.priority === "HIGH" ? "priority-high" : "priority-low"}>
            {msg.priority === "HIGH" ? "🔥 URGENT" : "Normal"}
          </span>
        </div>
      ))}
    </div>
  );
}
