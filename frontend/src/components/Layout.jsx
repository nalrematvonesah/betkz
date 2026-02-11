import React from "react";

export default function Layout({
  role,
  balance,
  onNavigate,
  onLogout,
  children
}) {
  return (
    <div className="layout">

      <aside className="sidebar">
        <div className="logo">BetKZ</div>

        <button onClick={() => onNavigate("dashboard")}>Dashboard</button>
        <button onClick={() => onNavigate("balance")}>Wallet</button>
        <button onClick={() => onNavigate("history")}>History</button>
        <button onClick={() => onNavigate("leaderboard")}>Leaderboard</button>

        {role === "admin" && (
          <button onClick={() => onNavigate("admin")}>Admin</button>
        )}
      </aside>

      <main className="main">
        <div className="topbar">
          <div>
            Balance: <strong>{balance} ₸</strong>
            {role === "admin" && (
              <span className="badge-admin">ADMIN</span>
            )}
          </div>

          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>

        <div className="content">{children}</div>
      </main>
    </div>
  );
}
