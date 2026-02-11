import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

export default function Dashboard({ refresh }) {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [outcome, setOutcome] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await api("/api/events");
    setEvents(data);
  };

  const placeBet = async () => {
    if (!selected || !outcome || !amount) return;

    await api("/api/bets", {
      method: "POST",
      body: JSON.stringify({
        eventId: selected._id,
        outcome,
        amount: Number(amount)
      })
    });

    setSelected(null);
    setOutcome("");
    setAmount("");
    refresh();
  };

  return (
    <div className="card">
      <h2>Matches</h2>

      <div className="event-grid">
        {events.map(ev => (
          <div
            key={ev._id}
            className={`event-card ${selected?._id===ev._id?"selected":""}`}
            onClick={() => setSelected(ev)}
          >
            <strong>{ev.title}</strong>
            <div>H x{ev.odds.home}</div>
            <div>D x{ev.odds.draw}</div>
            <div>A x{ev.odds.away}</div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="bet-slip">
          <h3>Bet Slip</h3>

          <select value={outcome} onChange={e=>setOutcome(e.target.value)}>
            <option value="">Select</option>
            <option value="home">Home</option>
            <option value="draw">Draw</option>
            <option value="away">Away</option>
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={e=>setAmount(e.target.value)}
          />

          <button onClick={placeBet}>Place Bet</button>
        </div>
      )}
    </div>
  );
}
