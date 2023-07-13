import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
const Navbar = (props) => {

  const handleLogout = (props) => {
    localStorage.removeItem("authToken");
    axios.defaults.headers.common['Authorization'] = '';
    props.isUserAuthenticated(false);
  }
  let location = useLocation();
  return (
    <nav className={`navbar border-bottom navbar-dark
     navbar-expand-md bg-body-tertiary`} data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">ENotes</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link`} onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
          {/* <form className="d-flex align-items-center" role="search">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="theme" onClick={props.toggleTheme} style={{cursor:"pointer"}}/>
            <label className={`form-check-label text-${props.theme==="dark"?"light":"dark"}`} htmlFor="theme">{props.theme==="dark"?"Light":"Dark"} Mode</label>
          </div>
          </form> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
