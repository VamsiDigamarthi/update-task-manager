import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import "./index.css";
const ResetPassword = ({ changeDarkMode, darkMode }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [eyeIconsValue, setEyeIconsValue] = useState(true);

  const [resetPassWordApi, setResetPassWordApi] = useState({});

  const [acknow, setAcknow] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [userDoesNot, setUserDoesNot] = useState("");

  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const API = axios.create({
      baseURL: "https://server-bt-tasks.onrender.com",
    });
    API.put("/auth/reset/password", user)
      .then((res) => {
        //console.log(res.data);
        setResetPassWordApi(res.data);
        setAcknow(res.data.acknowledged);
      })
      .catch((e) => {
        console.log(e.response?.data);
        setUserDoesNot(e.response?.data);
      });

    setUser({ username: "", password: "" });
    setConfirmPassword("");
    // let res = await axios({
    //   method: 'PUT',
    //   data: user,
    //   url: '/auth/reset/password',

    // });
    // if (res.status == 200) {
    //   success(res);
    // };
  };

  const confirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    if (darkMode) {
      changeDarkMode();
    }
  }, []);

  // const eyeValueIcon = () => {
  //   setEyeIconsValue(!false);
  // };

  //console.log(resetPassWordApi);

  console.log(acknow);

  return (
    <div className="login-container">
      <form
        onSubmit={submitForm}
        className="login-form1"
        style={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          height: "auto",
          padding: "30px",
        }}
      >
        <h1
          className="form-heading1"
          style={{
            textAlign: "center",
            width: "100%",
          }}
        >
          Reset Your Password
        </h1>

        <div
          className="inputBox"
          style={{
            width: "100%",
          }}
        >
          <input
            // placeholder="Email"
            // className="form-input"
            type="text"
            className="form-input1"
            onChange={usernameChange}
            name="username"
            value={user.username}
            required="required"
          />
          <span>
            <HiOutlineMail className="form-icons1" /> Email
          </span>
        </div>
        {userDoesNot && <p className="user-does-not-exit">{userDoesNot}</p>}
        <div
          className="inputBox"
          style={{
            width: "100%",
          }}
        >
          <input
            // placeholder=""
            // className="form-input"
            type={eyeIconsValue ? "password" : "text"}
            onChange={usernameChange}
            name="password"
            value={user.password}
            required="required"
          />
          <span>
            <RiLockPasswordLine className="form-icons1" /> Password
          </span>
          {eyeIconsValue ? (
            <AiOutlineEye
              onClick={() => setEyeIconsValue(!eyeIconsValue)}
              className="eye-icon"
              style={{ marginRight: "7px", marginTop: "10px" }}
            />
          ) : (
            <AiOutlineEyeInvisible
              onClick={() => setEyeIconsValue(!eyeIconsValue)}
              className="eye-icon"
              style={{ marginRight: "7px", marginTop: "10px" }}
            />
          )}
        </div>

        <div
          className="inputBox"
          style={{
            width: "100%",
          }}
        >
          <input
            // placeholder=""
            // className="form-input"
            type={eyeIconsValue ? "password" : "text"}
            onChange={confirmPasswordChange}
            // name="password"
            // value={user.password}
            required="required"
            value={confirmPassword}
          />
          <span>
            <RiLockPasswordLine className="form-icons1" /> Confirm Password
          </span>
          {eyeIconsValue ? (
            <AiOutlineEye
              onClick={() => setEyeIconsValue(!eyeIconsValue)}
              className="eye-icon"
              style={{ marginRight: "7px", marginTop: "10px" }}
            />
          ) : (
            <AiOutlineEyeInvisible
              onClick={() => setEyeIconsValue(!eyeIconsValue)}
              className="eye-icon"
              style={{ marginRight: "7px", marginTop: "10px" }}
            />
          )}
        </div>

        {acknow && (
          <p
            className="reset-msg"
            style={{
              color: "red",
            }}
          >
            password reset successfully
          </p>
        )}

        {/*  "#8f8d8d */}

        {confirmPassword !== user.password ? (
          <p style={{ textDecoration: "none", color: "#a3364e" }}>
            password confirmpassword must be same
          </p>
        ) : (
          user.username !== "" &&
          user.password !== "" && (
            <button className="login-btn" type="submit">
              submit
            </button>
          )
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <p>
            <Link to="/login" className="already-sign">
              <span
                className="reset-msg"
                style={{ textDecoration: "none", color: "#8f8d8d" }}
              >
                back to login page
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
