import React from "react";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";

import { FiMoon, FiSun } from "react-icons/fi";
// import { CiSettings } from "react-icons/ci";
import { BiSearchAlt } from "react-icons/bi";
import "./index.css";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/AuthAction";
const Header = ({ changeDarkMode, darkMode }) => {
  const dispatch = useDispatch();

  const darkIcon = () => {
    changeDarkMode();
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div
      className="search-dark-container"
      style={{
        borderBottom: darkMode
          ? "1px solid #ffffff"
          : "1px solid rgb(37, 51, 58)",
      }}
    >
      <div className="employee-serach-container eeeeee"></div>
      <div>
        {darkMode ? (
          <FiSun
            onClick={() => darkIcon()}
            style={{
              color: darkMode ? "red" : "blue",
              width: "30px",
              height: "30px",
            }}
          />
        ) : (
          <FiMoon
            onClick={() => darkIcon()}
            style={{
              color: darkMode ? "" : "black",
              width: "30px",
              height: "30px",
            }}
          />
        )}

        <button
          className="header-logout"
          onClick={handleLogOut}
          style={{
            marginLeft: "10px",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
