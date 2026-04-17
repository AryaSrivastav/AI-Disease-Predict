import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(data.reverse());
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
  };

  const deleteOne = (index) => {
    const updated = [...history];
    updated.splice(index, 1);
    setHistory(updated);
    localStorage.setItem("history", JSON.stringify(updated.reverse()));
  };

  const getRiskColor = (confidence) => {
    if (confidence > 0.8) return "bg-red-500";
    if (confidence > 0.6) return "bg-yellow-500";
    return "bg-green-500";
  };

  const filteredHistory = history
    .filter((item) =>
      item.disease.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => {
      if (filter === "high") return item.confidence > 0.8;
      if (filter === "medium")
        return item.confidence > 0.6 && item.confidence <= 0.8;
      if (filter === "low") return item.confidence <= 0.6;
      return true;
    });

  return (
  <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h1 className="text-3xl text-yellow-400 font-bold">
          Prediction History
        </h1>

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Clear All
          </button>
        )}
      </div>

<p className="text-red-400">DEBUG: FILTER SECTION</p>

      {/* SEARCH + FILTER */}
<div className="bg-white/10 p-4 rounded-xl mb-6 flex flex-col md:flex-row gap-4">

  <input
    placeholder="Search disease..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="p-3 rounded-lg bg-gray-900 text-white outline-none w-full border border-gray-600"
  />

  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="p-3 rounded-lg bg-gray-900 text-white outline-none border border-gray-600"
  >
    <option value="all">All</option>
    <option value="high">High Risk</option>
    <option value="medium">Medium Risk</option>
    <option value="low">Low Risk</option>
  </select>

</div>

      {/* EMPTY */}
      {filteredHistory.length === 0 && (
        <p className="text-gray-400">No matching records found</p>
      )}

      {/* CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredHistory.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-gray-700 shadow-lg hover:scale-105 transition duration-300"
          >

            {/* TOP */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl text-yellow-400 font-semibold">
                {item.disease}
              </h2>

              <span
                className={`text-xs px-3 py-1 rounded-full ${getRiskColor(
                  item.confidence
                )}`}
              >
                {(item.confidence * 100).toFixed(0)}%
              </span>
            </div>

            {/* DATE */}
            <p className="text-xs text-gray-400 mb-2">
              {new Date(item.date).toLocaleString()}
            </p>

            {/* CATEGORY (if added later) */}
            {item.category && (
              <p className="text-xs text-blue-400 mb-2">
                {item.category}
              </p>
            )}

            {/* SYMPTOMS */}
            <p className="text-sm text-gray-300 mb-4">
              <span className="text-gray-400">Symptoms:</span>{" "}
              {item.symptoms.join(", ")}
            </p>

            {/* ACTION */}
            <button
              onClick={() => deleteOne(index)}
              className="text-red-400 text-sm hover:underline"
            >
              Delete
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}