import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [selectedProfile, setSelectedProfile] = useState("all");

  useEffect(() => {
    const storedProfiles =
      JSON.parse(localStorage.getItem("profiles")) || {};

    setProfiles(storedProfiles);

    // 🔥 Flatten logs
    let allLogs = Object.keys(storedProfiles).flatMap((profile) =>
      (storedProfiles[profile].logs || []).map((log) => ({
        ...log,
        profile,
      }))
    );

    setData(allLogs);
  }, []);

  // 🔥 Filter by profile
  const filteredLogs =
    selectedProfile === "all"
      ? data
      : data.filter((log) => log.profile === selectedProfile);

  // 🔥 Format for chart
  const formatted = filteredLogs.map((item, i) => ({
    name: `#${i + 1}`,
    confidence: (item.confidence || 0) * 100,
  }));

  const COLORS = ["#ff4d4f", "#faad14", "#52c41a"];

  const pieData = [
    { name: "High", value: formatted.filter(d => d.confidence > 80).length },
    { name: "Medium", value: formatted.filter(d => d.confidence > 60 && d.confidence <= 80).length },
    { name: "Low", value: formatted.filter(d => d.confidence <= 60).length },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6">

      <h1 className="text-3xl text-yellow-400 mb-6">
        Dashboard
      </h1>

      {/* 👤 PROFILE FILTER */}
      <select
        value={selectedProfile}
        onChange={(e) => setSelectedProfile(e.target.value)}
        className="mb-6 p-2 rounded bg-gray-900 text-white"
      >
        <option value="all">All Profiles</option>
        {Object.keys(profiles).map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      {/* EMPTY */}
      {formatted.length === 0 ? (
        <p className="text-gray-400">No data available yet</p>
      ) : (
        <>
          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">

            <div className="bg-gray-100 dark:bg-white/10 p-4 rounded-xl">
              <p>Total Tests</p>
              <h2 className="text-2xl">{formatted.length}</h2>
            </div>

            <div className="bg-gray-100 dark:bg-white/10 p-4 rounded-xl">
              <p>High Risk Cases</p>
              <h2 className="text-2xl text-red-400">
                {pieData[0].value}
              </h2>
            </div>

            <div className="bg-gray-100 dark:bg-white/10 p-4 rounded-xl">
              <p>Avg Confidence</p>
              <h2 className="text-2xl">
                {Math.round(
                  formatted.reduce((a, b) => a + b.confidence, 0) /
                    formatted.length
                )}
                %
              </h2>
            </div>

          </div>

          {/* CHARTS */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* 📈 LINE */}
            <div className="bg-gray-100 dark:bg-white/10 p-4 rounded-xl">
              <h2 className="mb-3">Confidence Trend</h2>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={formatted}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="confidence"
                    stroke="#D4AF37"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 🥧 PIE */}
            <div className="bg-gray-100 dark:bg-white/10 p-4 rounded-xl">
              <h2 className="mb-3">Risk Distribution</h2>

              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={80}>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>
        </>
      )}
    </div>
  );
}