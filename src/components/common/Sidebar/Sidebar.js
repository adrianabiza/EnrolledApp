import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Sidebar.css";
import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";
import { useAuth } from "../../Auth/Auth";

function Sidebar(props) {
  const [data] = useState(props.data);
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <IconContext.Provider value={{ color: "#3a3b3c" }}>
        <nav className="sidebar-menu">
          <ul className="sidebar-menu-items">
            {data.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>{item.icon}</Link>
                </li>
              );
            })}
            <li className="sidebar-text">
              <a>
                <AiIcons.AiOutlineLogout size="25" onClick={handleLogout} />
              </a>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
