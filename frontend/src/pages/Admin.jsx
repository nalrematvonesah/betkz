import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

export default function Admin() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [home, setHome] = useState("");
  const [draw, setDraw] = useState("");
  const [away, setAway] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await api("/api/events");
    setEvents(data);
  };

  const create = async () => {
    if (!title || !home || !draw || !away) return;

    await api("/api/events", {
      method: "POST",
      body: JSON.stringify({
        title,
        odds: {
          home: Number(home),
          draw: Number(draw),
          away: Number(away)
        }
      })
    });

    setTitle("");
    setHome("");
    setDraw("");
    setAway("");
    load();
  };

  const resolve = async (id, result) => {
    await api(`/api/events/${id}/result`, {
      method: "PUT",
      body: JSON.stringify({ result })
    });

    await api(`/api/bets/resolve/event/${id}`, {
      method: "PUT"
    });

    load();
  };

  return (
    <div className="card">
      <h2>Create Match</h2>

      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Home odds" value={home} onChange={e => setHome(e.target.value)} />
      <input placeholder="Draw odds" value={draw} onChange={e => setDraw(e.target.value)} />
      <input placeholder="Away odds" value={away} onChange={e => setAway(e.target.value)} />

      <button onClick={create}>Create</button>

      <h2 style={{ marginTop: 40 }}>Matches</h2>

      {events.map(ev => (
        <div key={ev._id} className="table-row">
          <span>{ev.title}</span>
          <span>{ev.status}</span>

          {ev.status === "active" && (
            <>
              <button onClick={() => resolve(ev._id, "home")}>Home</button>
              <button onClick={() => resolve(ev._id, "draw")}>Draw</button>
              <button onClick={() => resolve(ev._id, "away")}>Away</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
