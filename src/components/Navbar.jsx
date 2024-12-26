import { NavLink } from "react-router-dom";

import { logo } from "../assets/images";

const Navbar = () => {
  return (
    <header className="header">
      <NavLink to="/">
        <div className="bg-white shadow-sm px-3 py-1 rounded-md">
          <span class="blue-gradient_text font-bold text-lg">3D</span>
        </div>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink to="/about" className={({ isActive }) => (isActive ? "text-blue-600" : "text-black")}>
          About
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => (isActive ? "text-blue-600" : "text-black")}>
          Projects
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
