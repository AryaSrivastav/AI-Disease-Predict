import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Tracker() {
  const [profiles, setProfiles] = useState({});
  const [selectedProfile, setSelectedProfile] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("profiles")) || {};
    setProfiles(data);

    const firstProfile = Object.keys(data)[0];
    if (firstProfile) setSelectedProfile(firstProfile);
  }, []);

  const logs = profiles[selectedProfile]?.logs || [];

  // 🔥 Chart data
  const chartData = logs.map((log, i) => ({
    name: `#${i + 1}`,
    weight: Number(log.weight),
  })).reverse();

  // 🔥 BMI Insight
  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  return (
  <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6">
      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">
          Health Tracker
        </h1>

        <select
          value={selectedProfile}
          onChange={(e) => setSelectedProfile(e.target.value)}
          className="bg-black/50 border border-gray-700 p-2 rounded"
        >
          {Object.keys(profiles).map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* 🧠 STATS */}
      {logs.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <div className="bg-white/10 p-4 rounded-xl backdrop-blur shadow">
            <p className="text-gray-400 text-sm">Latest Weight</p>
            <h2 className="text-xl">{logs[0].weight} kg</h2>
          </div>

          <div className="bg-white/10 p-4 rounded-xl backdrop-blur shadow">
            <p className="text-gray-400 text-sm">BMI</p>
            <h2 className="text-xl">
              {logs[0].bmi} ({getBMIStatus(logs[0].bmi)})
            </h2>
          </div>

          <div className="bg-white/10 p-4 rounded-xl backdrop-blur shadow">
            <p className="text-gray-400 text-sm">BP</p>
            <h2 className="text-xl">{logs[0].bp}</h2>
          </div>

        </div>
      )}

      {/* 📊 CHART */}
      {chartData.length > 0 && (
        <div className="bg-white/10 p-4 rounded-xl backdrop-blur mb-6">
          <h2 className="mb-3 text-yellow-400">Weight Trend</h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#D4AF37"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 📜 HISTORY */}
      <div className="space-y-4">
        {logs.length === 0 && <p>No data yet</p>}

        {logs.map((log, i) => (
          <div
            key={i}
            className="bg-white/10 p-4 rounded-xl backdrop-blur border border-white/10 hover:scale-[1.02] transition"
          >
            <p className="text-gray-400 text-sm">{log.date}</p>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <p>⚖️ Weight: {log.weight} kg</p>
              <p>🧬 BMI: {log.bmi}</p>
              <p>💓 BP: {log.bp}</p>
              <p>🍬 Sugar: {log.sugar}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}