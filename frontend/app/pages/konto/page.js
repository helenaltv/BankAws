"use client";

import { useState, useEffect } from "react";

export default function Account() {
  const [saldo, setSaldo] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchSaldo = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/me/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      setSaldo(data.saldo);
    };
    fetchSaldo();
  }, []);

  const handleDeposit = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3001/me/accounts/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, amount }),
    });
    const data = await res.json();
    setSaldo(data.saldo);
  };

  return (
    <div>
      <h1>Ditt saldo: {saldo} kr</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={handleDeposit}>Sätt in pengar</button>
    </div>
  );
}
