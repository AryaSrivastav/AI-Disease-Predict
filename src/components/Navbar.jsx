import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [dark, setDark] = useState(true);
  const [user, setUser] = useState(null);

  // Load theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") setDark(false);
  }, []);

  // Apply theme
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // Load user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-black text-black dark:text-white">

      {/* LOGO */}
      <h1
        className="text-yellow-500 font-bold text-xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        AI Health
      </h1>

      {/* LINKS */}
      <div className="flex gap-4 items-center">

        <Link to="/">Home</Link>
        <Link to="/predict">Predict</Link>
        <Link to="/history">History</Link>
        <Link to="/tracker">Tracker</Link>
         <Link to="/dashboard">Dashboard</Link>

        {/* LOGIN / USER */}
        {user ? (
          <>
            <span className="text-yellow-400">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => navigate("/login")}>
            Login
          </button>
        )}

        {/* 🌙 THEME TOGGLE */}
        <button
          onClick={() => setDark(!dark)}
          className="text-xl"
        >
          {dark ? "🌙" : "☀️"}
        </button>

      </div>

    </div>
  );
}