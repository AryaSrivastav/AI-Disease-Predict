import { useState } from "react";
import SymptomSelector from "../components/SymptomSelector";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { predictDisease } from "../api/prediction";

export default function SymptomForm() {
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 PROFILE STATE
  const [profile, setProfile] = useState("Aaru");

  const [data, setData] = useState({
    age: "",
    bp: "",
    sugar: "",
    height: "",
    weight: "",
    gender: "Female",
  });

  const navigate = useNavigate();

  const calculateBMI = () => {
    const h = data.height / 100;
    return (data.weight / (h * h)).toFixed(1);
  };

  const submit = async () => {
    try {
      setLoading(true);

      const bmi = calculateBMI();

      const res = await predictDisease({
        ...data,
        bmi,
        symptoms: selected,
      });

      // 🔥 SAVE PROFILE-WISE
      const healthLog = {
        weight: data.weight,
        bp: data.bp,
        sugar: data.sugar,
        bmi,
        gender: data.gender,
        date: new Date().toLocaleString(),
      };

      const allProfiles =
        JSON.parse(localStorage.getItem("profiles")) || {};

      const userData = allProfiles[profile] || { logs: [] };

      allProfiles[profile] = {
        gender: data.gender,
        logs: [healthLog, ...(userData.logs || [])],
      };

      localStorage.setItem("profiles", JSON.stringify(allProfiles));

      const entry = {
        ...res,
        bmi,
        symptoms: selected,
        date: new Date().toLocaleString(),
      };

      navigate("/result", { state: entry });

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6">
      <div className="bg-white/10 p-8 rounded-xl w-full max-w-xl">

        <h2 className="text-xl text-yellow-400 mb-4">
          Health Details
        </h2>

        {/* 🔥 PROFILE */}
        <input
          placeholder="Profile Name (e.g. Aaru, Mom)"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          className="input"
        />

        {/* 🔥 GENDER */}
        <select
          className="input"
          onChange={(e) =>
            setData({ ...data, gender: e.target.value })
          }
        >
          <option>Female</option>
          <option>Male</option>
        </select>

        <input placeholder="Age" className="input" onChange={(e)=>setData({...data, age:e.target.value})}/>
        <input placeholder="Blood Pressure" className="input" onChange={(e)=>setData({...data, bp:e.target.value})}/>
        <input placeholder="Blood Sugar" className="input" onChange={(e)=>setData({...data, sugar:e.target.value})}/>
        <input placeholder="Height (cm)" className="input" onChange={(e)=>setData({...data, height:e.target.value})}/>
        <input placeholder="Weight (kg)" className="input mb-4" onChange={(e)=>setData({...data, weight:e.target.value})}/>

        <SymptomSelector selected={selected} setSelected={setSelected} />

        <Button onClick={submit}>
          {loading ? <Loader /> : "Predict"}
        </Button>

      </div>
    </div>
  );
}