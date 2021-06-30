import React from "react";
import FirstNav from "../../components/common/Navbar/FirstNav";
import "./FirstPage.css";
import { Container } from "react-bootstrap";

function FirstPage() {
  return (
    <>
      <div>
        <FirstNav />
        <div className="main-bg">
          <h1>Welcome to EnrollEd</h1>
          <span>Your favourite learning experience</span>
        </div>
      </div>
    </>
  );
}

export default FirstPage;
