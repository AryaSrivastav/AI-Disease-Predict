import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden">

      {/* Animated glow */}
      <div className="absolute w-[500px] h-[500px] bg-yellow-500 opacity-20 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-10 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl font-bold mb-6 text-yellow-400 drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]"
      >
        AI Health Predictor
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 max-w-xl mb-8"
      >
        Predict diseases early with AI-powered analysis and smart health insights.
      </motion.p>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/predict")}
        className="bg-yellow-500 text-black px-8 py-3 rounded-xl font-semibold shadow-[0_0_20px_rgba(255,215,0,0.6)]"
      >
        Get Started
      </motion.button>

    </div>
  );
}