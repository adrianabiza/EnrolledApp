import React from "react";
import { Link } from "react-router-dom";
import "./FirstNav.css";
import logo from "../../../images/logo.png";

export default function FirstNav() {
  return (
    <div className="navbar fixed-top">
      <Link to="/">
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <div className="d-flex mr-3">
        <Link className="btn btn-outline-primary m-2" to="/login">
          Login
        </Link>
        <Link className="btn btn-outline-primary m-2" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
}
