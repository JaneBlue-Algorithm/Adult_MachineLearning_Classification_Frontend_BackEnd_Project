import { useState } from "react";
import { predictIncome } from "./api";
import "./App.css";


const options = {
  workclass: ["Private", "Self-emp-not-inc", "Self-emp-inc", "Federal-gov", "Local-gov", "State-gov", "Without-pay"],
  education: ["Bachelors", "HS-grad", "Some-college", "Masters", "Assoc", "11th", "10th", "7th-8th"],
  marital_status: ["Married-civ-spouse", "Divorced", "Never-married", "Separated", "Widowed"],
  occupation: ["Tech-support", "Craft-repair", "Other-service", "Sales", "Exec-managerial", "Prof-specialty"],
  relationship: ["Wife", "Husband", "Not-in-family", "Own-child", "Unmarried"],
  race: ["White", "Black", "Asian-Pac-Islander", "Amer-Indian-Eskimo", "Other"],
  sex: ["Male", "Female"],
  native_country: ["United-States", "Mexico", "Philippines", "Germany", "Canada", "India"]
};

function App() {
  const [form, setForm] = useState({
    age: "",
    fnlwgt: "",
    education_num: "",
    capital_gain: "",
    capital_loss: "",
    hours_per_week: "",
    workclass: "",
    education: "",
    marital_status: "",
    occupation: "",
    relationship: "",
    race: "",
    sex: "",
    native_country: ""
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  const { name, value } = e.target;

  setForm({
    ...form,
    [name]: value
  });
};

 const handleSubmit = async () => {
  setLoading(true);

  try {
    console.log("SENDING DATA:", form); // 👈 EKLE

    const res = await predictIncome(form);

    console.log("RESPONSE:", res.data); // 👈 EKLE

    setResult(res.data.income_class);

  } catch (err) {
    console.log("ERROR:", err.response || err);

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container">

      <div className="card">

        {/* LEFT */}
        <div className="form-section">
          <h2>Income Prediction Dashboard</h2>

        
          <div className="grid">

  {/* NUMERIC FIELDS */}
  <div className="form-group">
    <label>Age</label>
    <input name="age" onChange={handleChange} />
  </div>

  <div className="form-group">
    <label>Fnlwgt</label>
    <input name="fnlwgt" onChange={handleChange} />
  </div>

  <div className="form-group">
    <label>Education Num</label>
    <input name="education_num" onChange={handleChange} />
  </div>

  <div className="form-group">
    <label>Capital Gain</label>
    <input name="capital_gain" onChange={handleChange} />
  </div>

  <div className="form-group">
    <label>Capital Loss</label>
    <input name="capital_loss" onChange={handleChange} />
  </div>

  <div className="form-group">
    <label>Hours per Week</label>
    <input name="hours_per_week" onChange={handleChange} />
  </div>

  {/* DROPDOWNS */}
  {Object.keys(options).map((key) => (
    <div className="form-group" key={key}>
      <label>{key.replace("_", " ").toUpperCase()}</label>

      <select name={key} onChange={handleChange}>
        <option value="">Select {key}</option>
        {options[key].map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  ))}

</div>

          <button onClick={handleSubmit}>
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="result-section">
          <h3>Result</h3>

          {result ? (
            <div className={result === ">50K" ? "high" : "low"}>
              {result}
            </div>
          ) : (
            <p>No prediction yet</p>
          )}
        </div>

      </div>

    </div>
  );
}

export default App;