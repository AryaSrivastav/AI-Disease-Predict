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
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("history")) || [];

    const formatted = history.map((item, i) => ({
      name: `#${i + 1}`,
      confidence: (item.confidence || 0) * 100,
    }));

    setData(formatted.reverse());
  }, []);

  const COLORS = ["#ff4d4f", "#faad14", "#52c41a"];

  const pieData = [
    { name: "High", value: data.filter(d => d.confidence > 80).length },
    { name: "Medium", value: data.filter(d => d.confidence > 60 && d.confidence <= 80).length },
    { name: "Low", value: data.filter(d => d.confidence <= 60).length },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6">

      <h1 className="text-3xl text-yellow-400 mb-6">Dashboard</h1>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <p className="text-gray-400">No data available yet</p>
      ) : (
        <>
          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">

            <div className="bg-gray-100 dark:bg-white/10 p-4 rounded-xl">
              <p>Total Tests</p>
              <h2 className="text-2xl">{data.length}</h2>
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
                  data.reduce((a, b) => a + b.confidence, 0) / data.length
                )}%
              </h2>
            </div>

          </div>

          {/* CHARTS */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* LINE CHART */}
            <div className="bg-gray-100 dark:bg-white/10 p-4 rounded-xl">
              <h2 className="mb-3">Confidence Trend</h2>
              <LineChart width={300} height={200} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="confidence" stroke="#D4AF37" />
              </LineChart>
            </div>

            {/* PIE CHART */}
            <div className="bg-gray-100 dark:bg-white/10 p-4 rounded-xl">
              <h2 className="mb-3">Risk Distribution</h2>
              <PieChart width={300} height={200}>
                <Pie data={pieData} dataKey="value" outerRadius={70}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
              </PieChart>
            </div>

          </div>
        </>
      )}

    </div>
  );
}