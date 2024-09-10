"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validera användarnamn och lösenord
    if (!username || !password) {
      alert("Vänligen fyll i både användarnamn och lösenord.");
      return;
    }

    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (res.ok) {
      console.log(data);
      router.push("/loggain"); // Omdirigera till inloggningssidan efter skapandet
    } else {
      console.error("Error:", data.message);
      alert("Skapandet av användare misslyckades: " + data.message);
    }
  };

  return (
    <div>
      <h1>Skapa användare</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Skapa användare</button>
      </form>
    </div>
  );
}
