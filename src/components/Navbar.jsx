import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [dark, setDark] = useState(true);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false); // 🔥 mobile menu

  // Theme load
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
    <div className="bg-white dark:bg-black text-black dark:text-white px-4 py-3">

      {/* 🔝 TOP BAR */}
      <div className="flex justify-between items-center">

        {/* LOGO */}
        <h1
          className="text-yellow-500 font-bold text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          AI Health
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/">Home</Link>
          <Link to="/predict">Predict</Link>
          <Link to="/history">History</Link>
          <Link to="/tracker">Tracker</Link>
          <Link to="/dashboard">Dashboard</Link>

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

          {/* 🌙 THEME */}
          <button onClick={() => setDark(!dark)}>
            {dark ? "🌙" : "☀️"}
          </button>
        </div>

        {/* ☰ MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* 📱 MOBILE MENU */}
      {open && (
        <div className="flex flex-col mt-4 gap-3 md:hidden">

          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/predict" onClick={() => setOpen(false)}>Predict</Link>
          <Link to="/history" onClick={() => setOpen(false)}>History</Link>
          <Link to="/tracker" onClick={() => setOpen(false)}>Tracker</Link>
          <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>

          {user ? (
            <>
              <span className="text-yellow-400">{user.name}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
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

          {/* 🌙 THEME */}
          <button onClick={() => setDark(!dark)}>
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>

        </div>
      )}
    </div>
  );
}