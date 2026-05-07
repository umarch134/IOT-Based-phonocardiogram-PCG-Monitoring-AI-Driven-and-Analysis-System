
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registermain from "./Register/components/Registermain";
import Loginmain from "./Login/Loginmain";
import Forgetpw from "./Forgetpassword/Forgetpw";
import Doctormain from "./Doctor/components/Doctormain";
import PatientDashboard from "./Patient//components/PatientDashboard";
import Homepp from "./Home/Homepp"; 
function App() {
  return (
    <div className="text-center mt-10">
  <BrowserRouter>
  <Routes>
    <Route path="/register" element={<Registermain />} />
    <Route path="/login" element={<Loginmain />} />
     <Route path="/home" element={<Homepp/>} />
     <Route path="/forget" element={<Forgetpw />} />
     <Route path="/doctor" element={<Doctormain />} />
     <Route path="/patient" element={<PatientDashboard />} />
  </Routes>
</BrowserRouter>
</div>
  );
}

export default App;
