import React, { useEffect, useState } from "react";
import API from "../services/api";
import ChatWindow from "./ChatWindow"; // Import the new chat window component

function MatchedItems() {
  const [matches, setMatches] = useState([]);
  const [activeChat, setActiveChat] = useState(null); // To keep track of which match is chatting

  useEffect(() => {
    Promise.all([
      API.get("/report/lost/all"),
      API.get("/report/found/all"),
    ]).then(([lostRes, foundRes]) => {
      const lostItems = lostRes.data || [];
      const foundItems = foundRes.data || [];
      const matched = [];
      lostItems.forEach((lost) => {
        foundItems.forEach((found) => {
          if (
            lost.itemName &&
            found.itemName &&
            lost.location &&
            found.location &&
            lost.itemName.trim().toLowerCase() ===
              found.itemName.trim().toLowerCase() &&
            lost.location.trim().toLowerCase() ===
              found.location.trim().toLowerCase()
          ) {
            matched.push({ lost, found });
          }
        });
      });
      setMatches(matched);
    });
  }, []);

  return (
    <div
      className="bg-matched d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      <div className="container py-5">
        <h2 className="mb-4 text-warning fw-bold text-center">
          Matched Lost & Found Items
        </h2>
        {matches.length === 0 ? (
          <p className="text-center text-muted">
            No matched lost and found items yet.
          </p>
        ) : (
          <div className="row gy-3">
            {matches.map((match, i) => (
              <div key={i} className="col-12 col-md-6">
                <div className="card shadow-sm p-3">
                  <h5>Item: {match.lost.itemName}</h5>
                  <p>
                    <b>Location:</b> {match.lost.location}
                  </p>
                  <div>
                    <span className="fw-bold text-primary">Lost:</span>
                    <span>
                      {" "}
                      {match.lost.lostDate} — {match.lost.description}{" "}
                    </span>
                  </div>
                  <div>
                    <span className="fw-bold text-success">Found:</span>
                    <span>
                      {" "}
                      {match.found.foundDate} — {match.found.description}{" "}
                    </span>
                  </div>
                  {/* Chat Button */}
                  <button
                    className="btn btn-outline-primary mt-2"
                    onClick={() =>
                      setActiveChat({
                        lostId: match.lost.id,
                        foundId: match.found.id,
                      })
                    }
                  >
                    Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Chat Window Popup */}
        {activeChat && (
          <ChatWindow
            lostId={activeChat.lostId}
            foundId={activeChat.foundId}
            onClose={() => setActiveChat(null)}
          />
        )}
      </div>
    </div>
  );
}

export default MatchedItems;
