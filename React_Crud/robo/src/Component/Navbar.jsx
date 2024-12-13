import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand heText  fs-2 fw-bold" to="/">
          <span className="fs-1 text-black">🧸</span>Robonymous
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
          <FontAwesomeIcon icon={faBars} size="2xl" color="white" />
        </button>
        <div className="collapse navbar-collapse  justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 fw-semibold me-md-5">
            <li className="nav-item ps-md-3">
              <Link className="nav-link heText" aria-current="page" to="/">
                HOME
              </Link>
            </li>
            <li className="nav-item ps-md-3">
              <Link className="nav-link heText" to="/download">
                DOWNLOAD
              </Link>
            </li>
            <li className="nav-item ps-md-3">
              <Link className="nav-link heText" to="/register">
                REGISTER
              </Link>
            </li>
            <li className="nav-item ps-md-3">
              <Link className="nav-link heText" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="nav-item ps-md-3">
              <Link className="nav-link heText" to="/">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
