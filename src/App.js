import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";




import Setting from "./pages/Setting";
import Users from "./pages/Users";
import { useState } from "react";
import Login from "./pages/Login";
import Teams from "./pages/Teams";
import { useSelector } from "react-redux";
import NotAccess from "./pages/NotAccess";
import Admin from "./pages/Admin";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import SuperAdmin from "./pages/SuperAdmin";

var USER_TYPE = {
  EMPLOYEE: "employee",
  TEAM_LEADER: "teamleader",
  ADMIN: "admin",
  TEAM_LEADER_2: "market team",
  TEAMS: [],
  SUPER_ADMIN: "superadmin",
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const UUU = useSelector((state) => state.authReducer.authData);

  const changeDarkMode = () => {
    setDarkMode(!darkMode);
  };

  //console.log(darkMode);

  let CURRENT_USER = null;
  if (UUU) {
    CURRENT_USER = UUU.role;
    // console.log(CURRENT_USER);
  }

  return (
    <div className="body">
      <Router>
        <SideBar darkMode={darkMode}>
          <Routes>
            <Route
              path="/login"
              element={
                <Login changeDarkMode={changeDarkMode} darkMode={darkMode} />
              }
            />
            <Route
              path="/resetpassword"
              element={
                <ResetPassword
                  changeDarkMode={changeDarkMode}
                  darkMode={darkMode}
                />
              }
            />
            {/* <Route path="/" element={<Dashboard />} /> */}

            <Route
              path="/"
              element={
                UUU ? (
                  CURRENT_USER === USER_TYPE.EMPLOYEE ? (
                    <Navigate to="/employee" />
                  ) : CURRENT_USER === USER_TYPE.TEAM_LEADER ? (
                    <Navigate to="/teams" />
                  ) : (
                    <Navigate to="/dashboard" />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/superadmin"
              element={
                UUU ? (
                  CURRENT_USER === USER_TYPE.SUPER_ADMIN ? (
                    <SuperAdmin
                      changeDarkMode={changeDarkMode}
                      darkMode={darkMode}
                    />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* <Route
              path="/employee"
              element={
                <Users changeDarkMode={changeDarkMode} darkMode={darkMode} />
              }
            /> */}

            <Route
              path="/dashboard"
              element={
                UUU ? (
                  CURRENT_USER === USER_TYPE.ADMIN ? (
                    <Admin
                      changeDarkMode={changeDarkMode}
                      darkMode={darkMode}
                    />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/employee"
              element={
                UUU ? (
                  CURRENT_USER === USER_TYPE.EMPLOYEE ? (
                    <Users
                      changeDarkMode={changeDarkMode}
                      darkMode={darkMode}
                    />
                  ) : (
                    <NotAccess
                      changeDarkMode={changeDarkMode}
                      darkMode={darkMode}
                    />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* <Route
              path="/teams"
              element={
                <Teams changeDarkMode={changeDarkMode} darkMode={darkMode} />
              }
            /> */}

            {/*  */}

            <Route
              path="/teams"
              element={
                UUU ? (
                  CURRENT_USER === USER_TYPE.TEAM_LEADER ||
                  CURRENT_USER === USER_TYPE.ADMIN ? (
                    <Teams
                      changeDarkMode={changeDarkMode}
                      darkMode={darkMode}
                    />
                  ) : (
                    <NotAccess
                      changeDarkMode={changeDarkMode}
                      darkMode={darkMode}
                    />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/*  */}
            {/* 
            <Route path="/saved" element={<Saved />} />
            <Route path="/settings" element={<Setting />} />

            <Route path="*" element={<> not found</>} /> */}
          </Routes>
        </SideBar>
      </Router>
    </div>
  );
}

export default App;
