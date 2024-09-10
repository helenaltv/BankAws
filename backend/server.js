import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Arrayer
const users = [];
const accounts = [];
const sessions = [];

// Generera engångslösenord
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Skapa användare
app.post("/users", async (req, res) => {
  const { username, password } = req.body;

  // Kontrollera om användaren redan finns
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "Användare redan existerar" });
  }

  // Hash lösenordet
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = users.length + 101; // Generera unikt id
  const newUser = { id, username, password: hashedPassword };
  users.push(newUser);

  // Skapa ett nytt konto med 0 kr saldo
  const newAccount = { id: accounts.length + 1, userId: id, amount: 0 };
  accounts.push(newAccount);
  res.json({ message: "Användare skapad", user: newUser, account: newAccount });
});

// Logga in
app.post("/sessions", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateOTP();
    sessions.push({ userId: user.id, token });
    res.json({ message: "Inloggad", token });
  } else {
    res.status(401).json({ message: "Fel användarnamn eller lösenord" });
  }
});

// Hämta saldo
app.post("/me/accounts", (req, res) => {
  const { token } = req.body;
  const session = sessions.find((s) => s.token === token);
  if (session) {
    const account = accounts.find((acc) => acc.userId === session.userId);
    if (account) {
      res.json({ saldo: account.amount });
    } else {
      res.status(404).json({ message: "Konto hittades inte" });
    }
  } else {
    res.status(401).json({ message: "Ogiltigt engångslösenord" });
  }
});

// Sätt in pengar
app.post("/me/accounts/transactions", (req, res) => {
  const { token, amount } = req.body;
  const session = sessions.find((s) => s.token === token);
  if (session) {
    const account = accounts.find((acc) => acc.userId === session.userId);
    if (account) {
      account.amount += amount;
      res.json({ message: "Insättning lyckades", saldo: account.amount });
    } else {
      res.status(404).json({ message: "Konto hittades inte" });
    }
  } else {
    res.status(401).json({ message: "Ogiltigt engångslösenord" });
  }
});

// Starta servern
app.listen(port, () => {
  console.log(`Bankens backend körs på http://localhost:${port}`);
});
