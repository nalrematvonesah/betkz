import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { api } from "./utils/api";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Balance from "./pages/Balance";
import History from "./pages/History";
import Leaderboard from "./pages/Leaderboard";

export default function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(null);
  const [role, setRole] = useState("user");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
      setPage("dashboard");
      loadProfile();
    }
  }, []);

  const loadProfile = async () => {
    const user = await api("/api/users/profile");
    setRole(user.role);
    setBalance(user.balance);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPage("login");
  };

  if (!token) {
    if (page === "register")
      return <Register onSwitch={() => setPage("login")} />;

    return (
      <Login
        onLogin={() => {
          setToken(localStorage.getItem("token"));
          setPage("dashboard");
          loadProfile();
        }}
        onSwitch={() => setPage("register")}
      />
    );
  }

  return (
    <Layout
      role={role}
      balance={balance}
      onNavigate={setPage}
      onLogout={logout}
    >
      {page === "dashboard" && <Dashboard refresh={loadProfile} />}
      {page === "admin" && role === "admin" && <Admin />}
      {page === "balance" && <Balance refresh={loadProfile} />}
      {page === "history" && <History />}
      {page === "leaderboard" && <Leaderboard />}
    </Layout>
  );
}
