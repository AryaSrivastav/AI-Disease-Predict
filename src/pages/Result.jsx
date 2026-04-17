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
      <p className="text-sm text-gray-400 mb-4">BMI: {state.bmi}</p>

      <button
        onClick={downloadPDF}
        className="bg-yellow-500 text-black px-4 py-2 rounded-xl hover:bg-yellow-400 transition"
      >
        Download Report
      </button>

    </div>
  </div>
);