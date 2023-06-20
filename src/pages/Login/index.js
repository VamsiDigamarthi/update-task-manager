// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "axios";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { LogIn } from "../../actions/AuthAction";
import axios from "axios";
import "./index.css";

const Login = ({ changeDarkMode, darkMode }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });


  const [eyeIconsValue, setEyeIconsValue] = useState(true);

  //console.log(UUU?.response);

  let err;

  err=""

 err = useSelector((state) => state.authReducer.fail);

  // const error = useSelector((state) => state.authReducer.error);

  // console.log(error);

  // console.log(err);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    dispatch(LogIn(user, navigate));

    // login details api call start

    const API = axios.create({ baseURL: "http://localhost:5000" });

    const newDates = new Date();

    // const strinDate = newDates.toString();

    //const newStringDate = strinDate

    // Extract the date and time components
    const year = newDates.getFullYear();
    const month = (newDates.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1 and pad with leading zeros
    const day = newDates.getDate().toString().padStart(2, "0");
    const hours = newDates.getHours().toString().padStart(2, "0");
    const minutes = newDates.getMinutes().toString().padStart(2, "0");

    // Create the final formatted string
    const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}`;

    // console.log(formattedDateString);

    const values = {
      userName: user.username,
      dateField: formattedDateString,
    };

    // console.log(strinDate);
    // console.log(typeof strinDate);

    //console.log(values.dateField);

    API.post("/login/details", values)
      .then((res) => {
        //console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    // login details api call end

    setUser({ username: "", password: "" });
  };

  useEffect(() => {
    if (darkMode) {
      changeDarkMode();
    }
  }, []);

  return (
    <div className="login-container">
      <div className="login">
        <img
          className="login-img"
          // src="./images/new-new-task-image-removebg-preview.png"
          // src="./images/undraw_Mobile_pay_re_sjb8.png"
          src="https://t3.ftcdn.net/jpg/03/39/70/90/360_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg"
          alt="loginimage"
        />
        <form onSubmit={submitForm} className="login-form1">
          <h1 className="form-heading1">Login</h1>

          <div className="form-input-container1">
            <input
              // placeholder="Email"
              className="form-input1"
              type="text"
              onChange={usernameChange}
              name="username"
              value={user.username}
              required="required"
            />
            <span>
              <HiOutlineMail className="form-icons1" /> Email
            </span>
          </div>
          <div className="form-input-container1">
            <input
              // placeholder="Password"
              className="form-input1"
              type={eyeIconsValue ? "password" : "text"}
              onChange={usernameChange}
              name="password"
              value={user.password}
              required="required"
            />
            <span>
              {" "}
              <RiLockPasswordLine className="form-icons1" /> Password
            </span>

            {eyeIconsValue ? (
              <AiOutlineEye
                onClick={() => setEyeIconsValue(!eyeIconsValue)}
                className="eye-icon"
                style={{ marginRight: "7px" }}
              />
            ) : (
              <AiOutlineEyeInvisible
                onClick={() => setEyeIconsValue(!eyeIconsValue)}
                className="eye-icon"
                style={{ marginRight: "7px" }}
              />
            )}
          </div>
          
          <button className="login-btn" type="submit" disabled ={user.username === '' && user.password === ''}>
            Submit
          </button>

          <p className="reset-pass">
            <Link
              to="/resetpassword"
              style={{ textDecoration: "none", color: "#8f8d8d" }}
            >
              Reset your password
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
