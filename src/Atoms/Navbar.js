import React from "react";
import Angel from "../Assets/Img/DoubleTriangle.png";
import Logo from "../Assets/Img/Logo1.svg";
import Logout from "../Assets/Img/Logout.svg";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const history = useNavigate();

  return (
    <div className="nav-background">
      <nav className="navbar navbar-light nav-bg">
        <div className="container-fluid ms-3">
          <div className="d-flex">
            <NavLink
              className="navbar-brand text-decoration-none"
              to="/Form"
            >
              <img src={Logo} alt="" width="100%" height="40px" />
              {/* <span className="ms-3 mx-4 t-grey-400">Forms</span> */}
            </NavLink>
            {/* { JSON.parse(localStorage.getItem('super'))&&
            <NavLink
              className="navbar-brand text-decoration-none"
              to="/Member"
            >
              <span className="ms-3 mx-4 t-grey-400">Members</span>
            </NavLink>} */}
          </div>
          <div className=" cursorPointer">
            <span onClick={() => { localStorage.clear(); history('/') }} className="t-grey-400">
              <img src={Logout} alt="" width="100%" height="40px" />
            </span>
          </div>
        </div>
      </nav >
    </div >
  );
};

export default Navbar;
