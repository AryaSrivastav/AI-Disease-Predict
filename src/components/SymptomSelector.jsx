const symptomsList = [
  "Fever",
  "Cough",
  "Fatigue",
  "Headache",
  "Chest Pain",
  "Blurred Vision",
  "Dizziness",
  "Nausea",
];

export default function SymptomSelector({ selected, setSelected }) {
  return (
    <div className="flex flex-wrap gap-2">
      {symptomsList.map((symptom) => (
        <div
          key={symptom}
          onClick={() =>
            setSelected((prev) =>
              prev.includes(symptom)
                ? prev.filter((s) => s !== symptom)
                : [...prev, symptom]
            )
          }
          className={`px-3 py-1 rounded-full cursor-pointer ${
            selected.includes(symptom)
              ? "bg-yellow-500 text-black"
              : "bg-gray-700"
          }`}
        >
          {symptom}
        </div>
      ))}
    </div>
  );
}