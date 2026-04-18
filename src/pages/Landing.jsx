import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center text-white px-4 overflow-hidden">

      {/* Glow */}
      <div className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-yellow-500 opacity-20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-500 opacity-10 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-6xl font-bold mb-6 text-yellow-400"
      >
        AI Health Predictor
      </motion.h1>

      {/* Subtitle */}
      <p className="text-gray-400 max-w-md md:max-w-xl mb-8 text-sm md:text-base">
        Predict diseases early with AI-powered analysis and smart health insights.
      </p>

      {/* Button */}
      <button
      onClick={() => {
  console.log("GOING TO PREDICT");
  navigate("/predict");
}}
        onClick={() => navigate("/predict")}
        className="bg-yellow-500 text-black px-4 py-2 md:px-8 md:py-3 rounded-xl font-semibold hover:scale-105 transition"
      >
        Get Started
      </button>
    </div>
  );
}