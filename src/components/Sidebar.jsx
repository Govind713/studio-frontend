import { NavLink } from "react-router-dom";

const linkClasses = ({ isActive }) =>
  `sidebar-link ${isActive ? "sidebar-link--active" : ""}`;

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul className="sidebar-nav">
          <li>
            <NavLink to="/dashboard" className={linkClasses}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/category" className={linkClasses}>
              Category
            </NavLink>
          </li>
          <li>
            <NavLink to="/work" className={linkClasses}>
              Work
            </NavLink>
          </li>
          <li>
            <NavLink to="/complaint" className={linkClasses}>
              Complaint
            </NavLink>
          </li>
          <li>
            <NavLink to="/report" className={linkClasses}>
              Report
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
