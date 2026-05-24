import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GPACalculator from "./pages/GPACalculator";
import CGPACalculator from "./pages/CGPACalculator";
import GradingPolicy from "./pages/GradingPolicy";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import SplashScreen from "./components/SplashScreen";
import "./index.css";

import "./nebula-buttons.css";   // add after the index.css import

export default function App() {
  const [splash, setSplash] = useState(true);
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <>
      {splash && <SplashScreen onDone={() => setSplash(false)} />}
      <BrowserRouter>
        <Navbar dark={dark} toggleDark={() => setDark(d => !d)} />
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/gpa"     element={<GPACalculator />} />
          <Route path="/cgpa"    element={<CGPACalculator />} />
          <Route path="/grading" element={<GradingPolicy />} />
          <Route path="/about"   element={<About />} />
          <Route path="/faq"     element={<FAQ />} />
          <Route path="*"        element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}