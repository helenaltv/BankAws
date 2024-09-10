"use client"; // Se till att denna rad är högst upp

import { useState } from "react";
import { useRouter } from "next/navigation"; // Kontrollera att du importerar rätt

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter(); // Ändrad från useRouter till destructured push method

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      push("/konto"); // Använd push metoden för navigation
    } else {
      alert("Inloggning misslyckades");
    }
  };

  return (
    <div>
      <h1>Logga in</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Logga in</button>
      </form>
    </div>
  );
}
