import { useState } from "react";
import SymptomSelector from "../components/SymptomSelector";
import ProfileSelector from "../components/ProfileSelector";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { predictDisease } from "../api/prediction";

export default function SymptomForm() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    age: "",
    bp: "",
    sugar: "",
    height: "",
    weight: "",
  });

  const navigate = useNavigate();

  const calculateBMI = () => {
    const h = data.height / 100;
    return (data.weight / (h * h)).toFixed(1);
  };

  const submit = async () => {
    if (!profile) {
      alert("Select profile first");
      return;
    }

    if (!data.height || !data.weight) {
      alert("Enter height & weight");
      return;
    }

    setLoading(true);

    const bmi = calculateBMI();

    const res = await predictDisease({
      ...data,
      symptoms: selectedSymptoms,
    });

    const profiles = JSON.parse(localStorage.getItem("profiles")) || {};

    if (!profiles[profile]) {
      profiles[profile] = { logs: [] };
    }

    const log = {
      ...res,
      ...data,
      bmi,
      symptoms: selectedSymptoms,
      date: new Date().toISOString(),
    };

    profiles[profile].logs.unshift(log);

    localStorage.setItem("profiles", JSON.stringify(profiles));

    setLoading(false);

    navigate("/result", { state: log });
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-black text-white">
      <div className="w-full max-w-xl bg-white/10 p-6 rounded-2xl">

        <h2 className="text-xl text-yellow-400 mb-4">
          Health Details
        </h2>

        {/* PROFILE SELECTOR */}
        <ProfileSelector selected={profile} setSelected={setProfile} />

        {/* INPUTS */}
        <input placeholder="Age" className="input" onChange={(e)=>setData({...data, age:e.target.value})}/>
        <input placeholder="Blood Pressure" className="input" onChange={(e)=>setData({...data, bp:e.target.value})}/>
        <input placeholder="Blood Sugar" className="input" onChange={(e)=>setData({...data, sugar:e.target.value})}/>
        <input placeholder="Height (cm)" className="input" onChange={(e)=>setData({...data, height:e.target.value})}/>
        <input placeholder="Weight (kg)" className="input mb-4" onChange={(e)=>setData({...data, weight:e.target.value})}/>

        <SymptomSelector selected={selectedSymptoms} setSelected={setSelectedSymptoms} />

        <Button onClick={submit}>
          {loading ? <Loader /> : "Predict"}
        </Button>

      </div>
    </div>
  );
}