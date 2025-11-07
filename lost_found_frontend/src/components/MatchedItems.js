import React, { useEffect, useState } from "react";
import API from "../services/api";

function MatchedItems() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch lost and found items then match them
    Promise.all([
      API.get("/report/lost/all"),
      API.get("/report/found/all"),
    ]).then(([lostRes, foundRes]) => {
      const lostItems = lostRes.data || [];
      const foundItems = foundRes.data || [];
      // Simple match: itemName and location (case-insensitive, trimmed)
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
                    {match.lost.lostDate} — {match.lost.description}
                  </span>
                </div>
                <div>
                  <span className="fw-bold text-success">Found:</span>
                  <span>
                    {" "}
                    {match.found.foundDate} — {match.found.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default MatchedItems;
