import React, { useState } from "react";
import { api } from "../utils/api";

export default function Register({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await api("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password })
    });

    onSwitch();
  };

  return (
    <div className="card">
      <h2>Register</h2>

      <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />

      <button onClick={register}>Register</button>

      <p onClick={onSwitch} style={{cursor:"pointer"}}>
        Already have account? Login
      </p>
    </div>
  );
}
