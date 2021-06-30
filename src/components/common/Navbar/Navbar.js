import React from "react";
import * as HiIcons from "react-icons/hi";
import { useAuth } from "../../Auth/Auth";
import logo from "../../../images/logo.png";
import "./FirstNav.css";

function Navbar() {
  const { currentUser } = useAuth();
  return (
    <div className="navbar fixed-top d-flex justify-content-between">
      <div className="d-flex align-items-center">
        <img className="logo" src={logo} alt="Logo" />
        <h2 className="mb-0 ml-3 text-uppercase">EnrollEd</h2>
      </div>
      <div>
        <HiIcons.HiOutlineUserCircle
          size="40"
          color="#ff6f6b"
          className="m-2"
        />
        <strong className="mr-3">{currentUser.email}</strong>
      </div>
    </div>
  );
}

export default Navbar;
