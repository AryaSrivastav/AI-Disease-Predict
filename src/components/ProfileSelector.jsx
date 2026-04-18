import { useState, useEffect } from "react";

export default function ProfileSelector({ selected, setSelected }) {
  const [profiles, setProfiles] = useState({});
  const [newProfile, setNewProfile] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("profiles")) || {};
    setProfiles(data);

    const first = Object.keys(data)[0];
    if (first && !selected) setSelected(first);
  }, []);

  const addProfile = () => {
    if (!newProfile) return;

    const updated = { ...profiles };

    if (!updated[newProfile]) {
      updated[newProfile] = { logs: [] };
    }

    localStorage.setItem("profiles", JSON.stringify(updated));
    setProfiles(updated);
    setSelected(newProfile);
    setNewProfile("");
  };

  return (
    <div className="mb-4">

      {/* DROPDOWN */}
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full p-3 rounded bg-gray-900 text-white mb-2"
      >
        {Object.keys(profiles).map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      {/* ADD NEW PROFILE */}
      <div className="flex gap-2">
        <input
          placeholder="New profile (Mom, Dad...)"
          value={newProfile}
          onChange={(e) => setNewProfile(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-800 text-white"
        />

        <button
          onClick={addProfile}
          className="bg-yellow-500 px-3 rounded text-black"
        >
          Add
        </button>
      </div>
    </div>
  );
}