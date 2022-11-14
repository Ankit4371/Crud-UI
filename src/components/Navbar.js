import { Link } from "react-router-dom";

// Functional Component
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-info">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Employee Management System
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/addEmp">
                    Add New Employee
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
