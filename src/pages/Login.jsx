import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
  if (!form.email || !form.password) {
    alert("Please fill all fields");
    return;
  }

  if (isSignup && !form.name) {
    alert("Enter your name");
    return;
  }

  localStorage.setItem("user", JSON.stringify(form));

  
  window.location.href = "/";
};

return (
  <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl w-80 shadow-lg">

        <h1 className="text-2xl mb-6 text-yellow-400 text-center">
          {isSignup ? "Create Account" : "Login"}
        </h1>

        {/* Name (only for signup) */}
        {isSignup && (
          <input
            placeholder="Name"
            className="w-full p-3 mb-3 rounded bg-gray-900"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        )}

        {/* Email */}
        <input
          placeholder="Email"
          type="email"
          className="w-full p-3 mb-3 rounded bg-gray-900"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password */}
        <input
          placeholder="Password"
          type="password"
          className="w-full p-3 mb-4 rounded bg-gray-900"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-500 p-3 rounded text-black hover:bg-yellow-400 transition"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        {/* Toggle */}
        <p
          className="text-sm text-gray-400 mt-4 text-center cursor-pointer hover:underline"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign up"}
        </p>

      </div>
    </div>
  );
}