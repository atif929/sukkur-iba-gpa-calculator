import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GPACalculator from "./pages/GPACalculator";
import CGPACalculator from "./pages/CGPACalculator";
import GradingPolicy from "./pages/GradingPolicy";
import SplashScreen from "./components/SplashScreen";
import "./index.css";

export default function App() {
  const [splash, setSplash] = useState(true);

  return (
    <>
      {splash && <SplashScreen onDone={() => setSplash(false)} />}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/gpa"     element={<GPACalculator />} />
          <Route path="/cgpa"    element={<CGPACalculator />} />
          <Route path="/grading" element={<GradingPolicy />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}