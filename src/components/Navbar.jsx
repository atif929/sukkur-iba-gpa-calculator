import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <div className="navbar-logo">IBA</div>
          <div>
            <div className="navbar-title">GPA Calculator</div>
            <div className="navbar-subtitle">Sukkur IBA University</div>
          </div>
        </NavLink>

        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            Home
          </NavLink>
          <NavLink to="/gpa" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            GPA
          </NavLink>
          <NavLink to="/cgpa" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            CGPA
          </NavLink>
          <NavLink to="/grading" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            Grading
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
