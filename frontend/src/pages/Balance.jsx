import React, { useState } from "react";
import { api } from "../utils/api";

export default function Balance({ refresh }) {
  const [amount, setAmount] = useState("");

  const deposit = async () => {
    if (!amount || Number(amount) <= 0) return;

    await api("/api/users/deposit", {
      method: "POST",
      body: JSON.stringify({ amount: Number(amount) })
    });

    setAmount("");
    refresh();
  };

  return (
    <div className="card">
      <h2>Wallet</h2>

      <input
        type="number"
        placeholder="Deposit amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <button onClick={deposit}>Deposit</button>
    </div>
  );
}
