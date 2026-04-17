import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Mon", risk: 20 },
  { name: "Tue", risk: 40 },
  { name: "Wed", risk: 80 },
];

export default function Dashboard() {
  return (
    <div className="p-10 min-h-screen">
      <h1 className="text-3xl text-gold mb-6">Dashboard</h1>

      <LineChart width={400} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line dataKey="risk" stroke="#D4AF37" />
      </LineChart>
    </div>
  );
}