import React, { useEffect, useState } from "react";
import API from "../services/api";

function DashboardChat() {
  const currentEmail = localStorage.getItem("userEmail");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [request, setRequest] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load all users
  useEffect(() => {
    API.get("/direct-chat/users").then((res) => {
      const list = (res.data || []).filter(
        (u) => u.email && u.email !== currentEmail
      );
      setUsers(list);
    });
  }, [currentEmail]);

  // Load request + messages when a user is selected
  useEffect(() => {
    if (!selectedUser) return;
    const otherEmail = selectedUser.email;

    // request status
    API.get("/direct-chat/request", {
      params: { userA: currentEmail, userB: otherEmail },
    }).then((res) => setRequest(res.data || null));

    // messages
    API.get("/direct-chat/messages", {
      params: { userA: currentEmail, userB: otherEmail },
    }).then((res) => setMessages(res.data || []));
  }, [selectedUser, currentEmail]);

  const sendRequest = () => {
    if (!selectedUser) return;
    API.post("/direct-chat/request", {
      fromEmail: currentEmail,
      toEmail: selectedUser.email,
    }).then((res) => setRequest(res.data));
  };

  const acceptRequest = () => {
    if (!selectedUser) return;
    API.post("/direct-chat/request/accept", null, {
      params: { userA: currentEmail, userB: selectedUser.email },
    }).then((res) => setRequest(res.data));
  };

  const sendMessage = () => {
    if (
      !selectedUser ||
      !input.trim() ||
      !request ||
      request.status !== "ACCEPTED"
    )
      return;

    API.post(
      "/direct-chat/messages",
      { user: currentEmail, text: input },
      { params: { userA: currentEmail, userB: selectedUser.email } }
    ).then((res) => {
      setMessages(res.data || []);
      setInput("");
    });
  };

  const canChat = request && request.status === "ACCEPTED";

  const filteredUsers = users.filter((u) => {
    const name = (u.fullName || "").toLowerCase();
    const email = (u.email || "").toLowerCase();
    const q = search.toLowerCase();
    return name.includes(q) || email.includes(q);
  });

  return (
    <div className="row mt-4">
      {/* User list + search */}
      <div className="col-12 col-md-4">
        <div className="card p-3">
          <h5 className="mb-3">Users</h5>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="list-group">
            {filteredUsers.map((u) => (
              <li
                key={u.id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  selectedUser && selectedUser.email === u.email ? "active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedUser(u)}
              >
                <span>{u.fullName || u.email}</span>
                <small className="text-muted">{u.userType}</small>
              </li>
            ))}
            {filteredUsers.length === 0 && (
              <li className="list-group-item text-muted">
                No users match your search.
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Chat / request panel */}
      <div className="col-12 col-md-8 mt-3 mt-md-0">
        <div className="card p-3" style={{ minHeight: 260 }}>
          {selectedUser ? (
            <>
              <h5 className="mb-2">
                Chat with {selectedUser.fullName || selectedUser.email}
              </h5>

              {/* Request / accept controls */}
              {!request && (
                <button
                  className="btn btn-outline-primary mb-3"
                  onClick={sendRequest}
                >
                  Send Chat Request
                </button>
              )}

              {request && request.status === "PENDING" && (
                <>
                  {request.toEmail === currentEmail ? (
                    <button
                      className="btn btn-outline-success mb-3"
                      onClick={acceptRequest}
                    >
                      Accept Chat Request
                    </button>
                  ) : (
                    <p className="text-muted mb-3">
                      Chat request sent. Waiting for{" "}
                      {selectedUser.fullName || selectedUser.email} to accept.
                    </p>
                  )}
                </>
              )}

              {request && request.status === "ACCEPTED" && (
                <p className="text-success mb-2">Chat request accepted.</p>
              )}

              {/* Messages */}
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  padding: 10,
                  height: 180,
                  overflowY: "auto",
                  marginBottom: 10,
                  backgroundColor: "white",
                }}
              >
                {canChat ? (
                  messages.length > 0 ? (
                    messages.map((m, i) => (
                      <div
                        key={i}
                        style={{
                          textAlign: m.user === currentEmail ? "right" : "left",
                          marginBottom: 5,
                        }}
                      >
                        <small style={{ color: "#888" }}>{m.user}</small>
                        <br />
                        <span>{m.text}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-muted">No messages yet.</span>
                  )
                ) : (
                  <span className="text-muted">
                    Chat will be available once the request is accepted.
                  </span>
                )}
              </div>

              {/* Input */}
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    canChat
                      ? "Type a message..."
                      : "Request must be accepted to chat."
                  }
                  disabled={!canChat}
                />
                <button
                  className="btn btn-primary"
                  onClick={sendMessage}
                  disabled={!canChat}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <p className="text-muted">Select a user from the left to start.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardChat;
