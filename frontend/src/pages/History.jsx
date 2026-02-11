import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

export default function History() {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await api("/api/bets");
      setBets(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <h2>Bet History</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Bet History</h2>

      {bets.length === 0 ? (
        <p>No bets yet.</p>
      ) : (
        <div className="table">
          <div className="table-row">
            <strong>Match</strong>
            <strong>Outcome</strong>
            <strong>Amount</strong>
            <strong>Status</strong>
            <strong>Payout</strong>
          </div>

          {bets.map(b => (
            <div key={b._id} className="table-row">
              <span>{b.event?.title || "Deleted event"}</span>
              <span>{b.outcome}</span>
              <span>{b.amount}</span>
              <span
                style={{
                  color:
                    b.status === "won"
                      ? "#22c55e"
                      : b.status === "lost"
                      ? "#ef4444"
                      : "white"
                }}
              >
                {b.status}
              </span>
              <span>{b.payout}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
