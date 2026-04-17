export default function Card({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white">
      {children}
    </div>
  );
}