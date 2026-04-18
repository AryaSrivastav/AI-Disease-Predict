import { useEffect, useState } from "react";

export default function History() {
  const [profiles, setProfiles] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("profiles")) || {};
    setProfiles(data);
  }, []);

  const clearAll = () => {
    localStorage.removeItem("profiles");
    setProfiles({});
  };

  return (
    <div className="min-h-screen p-6 bg-black text-white">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-yellow-400 font-bold">
          Prediction History
        </h1>

        <button
          onClick={clearAll}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Clear All
        </button>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search disease..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-3 rounded bg-gray-900 w-full mb-6"
      />

      {/* PROFILES */}
      {Object.keys(profiles).length === 0 && (
        <p>No data yet</p>
      )}

      {Object.entries(profiles).map(([profile, data]) => {
        const logs = data.logs || [];

        const filteredLogs = logs.filter((log) =>
          log.disease?.toLowerCase().includes(search.toLowerCase())
        );

        if (filteredLogs.length === 0) return null;

        return (
          <div key={profile} className="mb-8">

            {/* PROFILE HEADER */}
            <h2 className="text-2xl text-yellow-400 mb-3">
              👤 {profile}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

              {filteredLogs.map((item, i) => (
                <div key={i} className="bg-white/10 p-4 rounded-xl">

                  <h3 className="text-lg">{item.disease}</h3>

                  <p className="text-sm text-gray-400">
                    {(item.confidence * 100).toFixed(0)}%
                  </p>

                  <p className="text-xs text-gray-500">
                    {new Date(item.date).toLocaleString()}
                  </p>

                </div>
              ))}

            </div>
          </div>
        );
      })}
    </div>
  );
}