import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import { recommendations } from "../data/recommendations";

export default function Result() {
  const { state } = useLocation();

  if (!state) return <div>No result</div>;

  const rec = recommendations[state.disease];

  //  BMI STATUS
  const getBMIStatus = () => {
    if (state.bmi < 18.5) return "Underweight";
    if (state.bmi < 25) return "Normal";
    if (state.bmi < 30) return "Overweight";
    return "Obese";
  };

  //  PDF FUNCTION (PREMIUM STYLE)
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(22);
    doc.setTextColor(212, 175, 55);
    doc.text("AI Health Report", 60, 20);

    doc.setDrawColor(200);
    doc.line(20, 25, 190, 25);

    let y = 35;

    const drawCard = (title, contentLines) => {
      const boxHeight = contentLines.length * 7 + 10;

      doc.setDrawColor(180);
      doc.roundedRect(15, y - 5, 180, boxHeight, 3, 3);

      doc.setFontSize(12);
      doc.setTextColor(212, 175, 55);
      doc.text(title, 20, y);

      y += 7;

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);

      contentLines.forEach((line) => {
        doc.text(line, 20, y);
        y += 6;
      });

      y += 5;
    };

    drawCard("Diagnosis", [
      `Disease: ${state.disease}`,
      `Confidence: ${(state.confidence * 100).toFixed(0)}%`,
      `Risk: ${state.risk}`,
    ]);

    drawCard("Health Metrics", [
      `BMI: ${state.bmi} (${getBMIStatus()})`,
      `Symptoms: ${state.symptoms.join(", ")}`,
    ]);

    if (rec) {
      drawCard("Precautions", rec.precautions.map(p => `- ${p}`));
      drawCard("Diet Plan", rec.diet.map(d => `- ${d}`));
      drawCard("Doctor Advice", [rec.doctor]);
    }

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 280);

    doc.save("AI-Health-Report.pdf");
  };

return (
<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white"><div className="w-full max-w-xl bg-gray-100 dark:bg-white/10 backdrop-blur">
        {/*  HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-yellow-400">
            AI Health Predictor
          </h1>
          <span className="text-xs text-gray-400">Report</span>
        </div>

        {/*  DISEASE */}
        <div className="bg-black/40 p-4 rounded-xl mb-4">
          <h2 className="text-2xl font-semibold text-yellow-400">
            {state.disease}
          </h2>

          <p className="text-sm text-gray-400">
            Confidence: {(state.confidence * 100).toFixed(0)}%
          </p>

          <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
            <div
              className="bg-yellow-500 h-2 rounded-full"
              style={{ width: `${state.confidence * 100}%` }}
            />
          </div>
        </div>

        {/*  RISK */}
        <div className="bg-black/40 p-4 rounded-xl mb-4">
          <p className="text-sm text-gray-400">Risk Level</p>

          <p className={`text-lg font-bold ${
            state.risk === "High"
              ? "text-red-400"
              : state.risk === "Medium"
              ? "text-yellow-400"
              : "text-green-400"
          }`}>
            {state.risk}
          </p>
        </div>

        {/*  WHY */}
        <div className="bg-black/40 p-4 rounded-xl mb-4">
          <p className="text-yellow-400 font-semibold mb-1">
            Why this result?
          </p>
          <p className="text-sm text-gray-400">
            Based on your symptoms: {state.symptoms.join(", ")}, 
            this matches patterns of {state.disease}.
          </p>
        </div>

        {/* 📊 BMI */}
        <div className="bg-black/40 p-4 rounded-xl mb-4">
          <p className="text-yellow-400 font-semibold">BMI Insight</p>
          <p className="text-sm text-gray-400">
            {state.bmi} ({getBMIStatus()})
          </p>
        </div>

        {/*  RECOMMENDATIONS */}
        {rec && (
          <div className="bg-black/40 p-4 rounded-xl mb-4">
            <h3 className="text-yellow-400 font-semibold mb-2">
              Recommendations
            </h3>

            <p className="text-sm font-semibold">Precautions</p>
            <ul className="text-sm text-gray-400 mb-2">
              {rec.precautions.map((p,i)=><li key={i}>• {p}</li>)}
            </ul>

            <p className="text-sm font-semibold">Diet</p>
            <ul className="text-sm text-gray-400 mb-2">
              {rec.diet.map((d,i)=><li key={i}>• {d}</li>)}
            </ul>

            <p className="text-sm font-semibold">Doctor Advice</p>
            <p className="text-sm text-gray-400">{rec.doctor}</p>
          </div>
        )}

        {/*  DOWNLOAD BUTTON */}
        <button
          onClick={downloadPDF}
          className="mt-6 w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold py-3 rounded-xl shadow-lg hover:scale-105 transition"
        >
          📄 Download Health Report
        </button>

      </div>
    </div>
  );
}