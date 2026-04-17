import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Landing from "./pages/Landing";
import SymptomForm from "./pages/SymptomForm";
import Result from "./pages/Result";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Tracker from "./pages/Tracker";

export default function App() {
  return (
    <BrowserRouter>

      {/* TOP NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/predict" element={<SymptomForm />} />
        <Route path="/result" element={<Result />} />
        <Route path="/history" element={<History />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tracker" element={<Tracker />} />
      </Routes>

      {/* FOOTER */}
      <Footer />

      {/* CHATBOT */}
      <ChatBot />

    </BrowserRouter>
  );
}