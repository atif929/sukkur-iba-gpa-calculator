import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GPACalculator from "./pages/GPACalculator";
import CGPACalculator from "./pages/CGPACalculator";
import GradingPolicy from "./pages/GradingPolicy";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/gpa"     element={<GPACalculator />} />
        <Route path="/cgpa"    element={<CGPACalculator />} />
        <Route path="/grading" element={<GradingPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}
