import React, { useState, useEffect } from "react";
import API from "../services/api";

function ChatWindow({ lostId, foundId, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Fetch messages for this match
  useEffect(() => {
    API.get(`/chat/${lostId}/${foundId}`).then((res) =>
      setMessages(res.data || [])
    );
  }, [lostId, foundId]);

  // Send a new message
  const sendMessage = () => {
    const sender = localStorage.getItem("userEmail");
    if (input.trim()) {
      API.post(`/chat/${lostId}/${foundId}`, {
        sender,
        message: input,
      }).then((res) => setMessages(res.data || []));
      setInput("");
    }
  };

  return (
    <div
      className="chat-window"
      style={{
        position: "fixed",
        right: 30,
        bottom: 30,
        width: 350,
        background: "#fff",
        border: "1px solid #ccc",
        zIndex: 1000,
        boxShadow: "0 0 10px #ccc",
        borderRadius: 8,
      }}
    >
      <div
        className="chat-header"
        style={{
          padding: 10,
          borderBottom: "1px solid #ddd",
          background: "#f5f5f5",
        }}
      >
        <strong>Chat</strong>
        <button
          onClick={onClose}
          style={{ float: "right", border: "none", background: "none" }}
        >
          ⨉
        </button>
      </div>
      <div
        className="chat-body"
        style={{ height: 200, overflowY: "auto", padding: 10 }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign:
                m.sender === localStorage.getItem("userEmail")
                  ? "right"
                  : "left",
              marginBottom: 5,
            }}
          >
            <span style={{ fontSize: 12, color: "#888" }}>{m.sender}</span>
            <br />
            <span>{m.message}</span>
          </div>
        ))}
      </div>
      <div
        className="chat-footer"
        style={{
          padding: 10,
          borderTop: "1px solid #ddd",
          background: "#fafafa",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "70%", marginRight: 10 }}
          placeholder="Type a message"
        />
        <button onClick={sendMessage} className="btn btn-sm btn-primary">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
