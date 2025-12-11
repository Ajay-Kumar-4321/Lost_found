import React, { useEffect, useState } from "react";
import API from "../services/api";

function AdminPanel() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [matchedItems, setMatchedItems] = useState([]);
  const [users, setUsers] = useState([]);
  // Fetch all data on component mount
  useEffect(() => {
    API.get("/report/lost/all").then((res) => setLostItems(res.data || []));
    API.get("/report/found/all").then((res) => setFoundItems(res.data || []));
    API.get("/matched-items/all").then((res) =>
      setMatchedItems(res.data || [])
    );
    API.get("/users").then((res) => setUsers(res.data || []));
  }, []);

  // Remove both lost and found reports for a matched item
  const removeMatchedItem = (lostId, foundId) => {
    if (
      window.confirm(
        "Are you sure you want to delete both lost and found items for this match?"
      )
    ) {
      Promise.all([
        API.delete(`/report/lost/${lostId}`),
        API.delete(`/report/found/${foundId}`),
      ]).then(() => {
        setLostItems((lst) => lst.filter((x) => x.id !== lostId));
        setFoundItems((lst) => lst.filter((x) => x.id !== foundId));
        setMatchedItems((matches) =>
          matches.filter((m) => m.lost.id !== lostId && m.found.id !== foundId)
        );
      });
    }
  };

  const removeLostItem = (id) => {
    if (window.confirm("Are you sure you want to delete this Lost item?")) {
      API.delete(`/report/lost/${id}`).then(() =>
        setLostItems((lst) => lst.filter((x) => x.id !== id))
      );
    }
  };

  const removeFoundItem = (id) => {
    if (window.confirm("Are you sure you want to delete this Found item?")) {
      API.delete(`/report/found/${id}`).then(() =>
        setFoundItems((lst) => lst.filter((x) => x.id !== id))
      );
    }
  };

  const removeUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      API.delete(`/users/${id}`).then(() =>
        setUsers((lst) => lst.filter((u) => u.id !== id))
      );
    }
  };

  return (
    <div
      className="bg-manage d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      <div className="container mt-4">
        <h2 className="mb-3">Admin Panel</h2>

        <h4>All Users</h4>
        <ul className="list-group mb-4">
          {users.map((u) => (
            <li
              key={u.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <b>{u.fullName || u.email}</b> ({u.userType}) – {u.email}
              </span>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => removeUser(u.id)}
              >
                Delete User
              </button>
            </li>
          ))}
          {users.length === 0 && (
            <li className="list-group-item text-muted">No users found.</li>
          )}
        </ul>
        <h4>All Lost Items</h4>
        <ul className="list-group mb-4">
          {lostItems.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <b>{item.itemName}</b> at {item.location} on {item.lostDate}
              </span>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => removeLostItem(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <h4>All Found Items</h4>
        <ul className="list-group mb-4">
          {foundItems.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <b>{item.itemName}</b> at {item.location} on {item.foundDate}
              </span>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => removeFoundItem(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <h4>All Matched Items</h4>
        <ul className="list-group">
          {matchedItems.map((match, i) => (
            <li
              key={i}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <b>{match.lost?.itemName}</b> ({match.lost?.location})<br />
                LOST: {match.lost?.description} <br />
                FOUND: {match.found?.description}
              </span>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => removeMatchedItem(match.lost.id, match.found.id)}
              >
                Remove Matched Item (Delete Both)
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;
