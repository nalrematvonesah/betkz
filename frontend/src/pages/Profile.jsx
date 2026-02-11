import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/users/profile", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then(r => r.json())
      .then(setUser);
  }, []);

  if (!user) return null;

  return (
    <div className="card">
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Balance: {user.balance} ₸</p>
    </div>
  );
}
