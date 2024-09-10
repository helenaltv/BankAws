"use client";
import Link from "next/link";

function Header() {
  return (
    <header className="header flex items-center justify-between p-4">
      <img className="Logan h-10" src="/images/Logo.png" alt="logo" />
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">HEM</Link>
          </li>
          <li>
            <button className="bg-yellow-500 px-4 py-2 rounded">
              <Link href="/pages/loggain">Logga in</Link>
            </button>
          </li>
          <li>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">
              <Link href="/pages/skapaanvandare">Skapa konto</Link>
            </button>
          </li>
          <li>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              <Link href="/pages/konto">Konto</Link>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
