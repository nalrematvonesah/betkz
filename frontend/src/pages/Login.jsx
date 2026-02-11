import React, { useState } from "react";
import { api } from "../utils/api";

export default function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    localStorage.setItem("token", res.token);
    onLogin();
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />

      <button onClick={login}>Login</button>

      <p onClick={onSwitch} style={{cursor:"pointer"}}>
        No account? Register
      </p>
    </div>
  );
}
