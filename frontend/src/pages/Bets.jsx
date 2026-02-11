import React, { useEffect, useState } from "react";

export default function Bets({ refreshBalance }) {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [outcome, setOutcome] = useState("");
  const [amount, setAmount] = useState("");

  const token = localStorage.getItem("token");

  const load = async () => {
    const e = await fetch("/api/events").then(r => r.json());
    setEvents(e);
  };

  useEffect(() => { load(); }, []);

  const placeBet = async () => {
    if (!selected || !outcome || !amount) return;

    await fetch("/api/bets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        eventId: selected._id,
        outcome,
        amount: Number(amount)
      })
    });

    setAmount("");
    setOutcome("");
    setSelected(null);
    refreshBalance(token);
  };

  return (
    <div className="card">

      <h2>Football Matches</h2>

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
            <option value="">Select outcome</option>
            <option value="home">Home</option>
            <option value="draw">Draw</option>
            <option value="away">Away</option>
          </select>

          <input
            type="number"
            placeholder="Bet amount"
            value={amount}
            onChange={e=>setAmount(e.target.value)}
          />

          <button onClick={placeBet}>Place Bet</button>
        </div>
      )}

    </div>
  );
}
