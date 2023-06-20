import React from "react";

import Header from "../Header";
import "./index.css";
const NotAccess = ({ changeDarkMode, darkMode }) => {
  return (
    <div className="notaccess new-user-component">
      <div className="right-not">
        <Header changeDarkMode={changeDarkMode} darkMode={darkMode} />
        <div>
          <img className="not-img" src="./images/acc1-removebg-preview.png" />
        </div>
      </div>
    </div>
  );
};

export default NotAccess;
