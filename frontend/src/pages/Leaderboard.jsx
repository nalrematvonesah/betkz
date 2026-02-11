import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await api("/api/users/leaderboard");
    setUsers(data);
  };

  return (
    <div className="card">
      <h2>Leaderboard</h2>

      <div className="table">
        <div className="table-row">
          <strong>User</strong>
          <strong>Balance</strong>
        </div>

        {users.map(u => (
          <div key={u._id} className="table-row">
            <span>{u.username}</span>
            <span>{u.balance}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
