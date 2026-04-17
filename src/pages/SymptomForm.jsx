import { useState } from "react";
import SymptomSelector from "../components/SymptomSelector";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { predictDisease } from "../api/prediction";

export default function SymptomForm() {
  const [selected, setSelected] = useState([]);
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
    if (!data.height || !data.weight) {
      alert("Enter height & weight");
      return;
    }

    setLoading(true);

    const bmi = calculateBMI();

    const res = await predictDisease({
      ...data,
      symptoms: selected,
    });

    const entry = {
      ...res,
      bmi,
      symptoms: selected,
      date: new Date().toLocaleString(),
    };

    const old = JSON.parse(localStorage.getItem("history")) || [];
    localStorage.setItem("history", JSON.stringify([entry, ...old]));

    setTimeout(() => {
      setLoading(false);
      navigate("/result", { state: entry });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f172a] to-black text-white">
      <div className="w-full max-w-xl bg-white/10 p-6 md:p-8 rounded-2xl">

        <h2 className="text-xl md:text-2xl mb-4 text-yellow-400">
          Health Details
        </h2>

        <input placeholder="Age" className="input" onChange={(e)=>setData({...data, age:e.target.value})}/>
        <input placeholder="Blood Pressure" className="input" onChange={(e)=>setData({...data, bp:e.target.value})}/>
        <input placeholder="Blood Sugar" className="input" onChange={(e)=>setData({...data, sugar:e.target.value})}/>
        <input placeholder="Height (cm)" className="input" onChange={(e)=>setData({...data, height:e.target.value})}/>
        <input placeholder="Weight (kg)" className="input mb-4" onChange={(e)=>setData({...data, weight:e.target.value})}/>

        <SymptomSelector selected={selected} setSelected={setSelected} />

        <div className="mt-4">
          <Button onClick={submit}>
            {loading ? <Loader /> : "Predict"}
          </Button>
        </div>

      </div>
    </div>
  );
}