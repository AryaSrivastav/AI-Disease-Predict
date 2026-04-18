import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import { recommendations } from "../data/recommendations";

export default function Result() {
  const { state } = useLocation();

  // ❗ Safety check (prevents crash on refresh)
  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No result found
      </div>
    );
  }

  const rec = recommendations[state.disease];

  // 📄 PDF FUNCTION
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("AI Health Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Disease: ${state.disease}`, 20, 40);
    doc.text(
      `Confidence: ${(state.confidence * 100).toFixed(0)}%`,
      20,
      50
    );
    doc.text(`Risk: ${state.risk}`, 20, 60);
    doc.text(`BMI: ${state.bmi}`, 20, 70);
    doc.text(`Symptoms: ${state.symptoms.join(", ")}`, 20, 80);

    if (rec) {
      doc.text("Precautions:", 20, 100);
      rec.precautions.forEach((p, i) =>
        doc.text(`- ${p}`, 20, 110 + i * 8)
      );

      doc.text("Diet:", 20, 140);
      rec.diet.forEach((d, i) =>
        doc.text(`- ${d}`, 20, 150 + i * 8)
      );

      doc.text("Doctor Advice:", 20, 180);
      doc.text(rec.doctor, 20, 190);
    }

    doc.save("AI-Health-Report.pdf");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-black to-gray-900 text-white">
      <div className="w-full max-w-md bg-white/10 p-6 md:p-8 rounded-2xl text-center">

        <h1 className="text-2xl md:text-3xl text-yellow-400 mb-4">
          {state.disease}
        </h1>

        <p className="mb-2 text-sm md:text-base">
          Confidence: {(state.confidence * 100).toFixed(0)}%
        </p>

        <div className="w-full bg-gray-700 h-3 rounded-full mb-4">
          <div
            className="bg-yellow-500 h-3 rounded-full"
            style={{ width: `${state.confidence * 100}%` }}
          ></div>
        </div>

        <p className="mb-2">Risk: {state.risk}</p>
        <p className="text-sm text-gray-400 mb-4">
          BMI: {state.bmi}
        </p>

        {/* 📄 PDF BUTTON */}
        <button
          onClick={downloadPDF}
          className="bg-yellow-500 text-black px-4 py-2 rounded-xl hover:bg-yellow-400 transition"
        >
          Download Report
        </button>

        {/* 🍎 RECOMMENDATIONS */}
        {rec && (
          <div className="mt-6 text-left">

            <h3 className="text-yellow-400 font-semibold mb-2">
              Recommendations
            </h3>

            <p className="font-semibold">Precautions:</p>
            <ul className="text-sm text-gray-300 mb-2">
              {rec.precautions.map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>

            <p className="font-semibold">Diet:</p>
            <ul className="text-sm text-gray-300 mb-2">
              {rec.diet.map((d, i) => (
                <li key={i}>• {d}</li>
              ))}
            </ul>

            <p className="font-semibold">Doctor Advice:</p>
            <p className="text-sm text-gray-300">
              {rec.doctor}
            </p>

          </div>
        )}

      </div>
    </div>
  );
}