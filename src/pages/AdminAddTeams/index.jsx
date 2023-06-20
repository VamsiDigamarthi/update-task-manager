import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { AiOutlineUser, AiOutlineAntDesign } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine, RiTeamLine } from "react-icons/ri";
import FileBase64 from "react-file-base64";
import "./index.css";
import { useSelector } from "react-redux";
import axios from "axios";

const AdminAddTeams = ({ addTeams, setAddTeams, getAllTeamsByAdmin }) => {
  const UUU = useSelector((state) => state.authReducer.authData);

  //   console.log(UUU);
  //console.log(UUU._id);

  //const [profilePic, setProfilePic] = useState("");

  const [user, setUser] = useState({
    head: UUU._id,
    name: "",

    //head: UUU.role,

    username: "",
    password: "",
    role: "",
    designation: "",
    profilePic: "",
  });

  // const setHead = () => {
  //   setUser({ ...user, head: UUU._id });
  // };
  // setHead();

  const usernameChange = (e) => {
    // setUser({ ...user, head: UUU.role });
    setUser({ ...user, head: UUU._id });
    setUser({ ...user, [e.target.name]: e.target.value });

    // if(e.target.files && e.target.files[0]){

    // }
  };

  // const profilePicChange = (e) => {
  //   setProfilePic(e.target.files[0]);
  //   //setUser({ ...user, profilePic: e.target.files[0] });
  // };

  const theme = useMantineTheme();

  const submitForm = async (e) => {
    e.preventDefault();

    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.post("/auth/register", user)
      .then((res) => {
        //console.log(`api data ${res.data}`);
        setAddTeams(false);
        // setAddUserModal(false);
        // getTeamOfEmployee();
        getAllTeamsByAdmin();
      })
      .catch((e) => {
        console.log(e);
      });

    setUser({
      name: "",
      username: "",
      password: "",
      role: "",
      designation: "",
      head: UUU._id,
      profilePic: "",
    });
  };

  //console.log(user);

  return (
    <>
      <Modal
        centered
        opened={addTeams}
        onClose={() => setAddTeams(false)}
        title="Register"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 2,
        }}
        transitionProps={{
          transition: "fade",
          duration: 300,
          timingFunction: "linear",
        }}
      >
        <form
          onSubmit={submitForm}
          className="login-form1"
          style={{
            width: "100%",
            marginTop: "20px",
          }}
        >
          <div
            className="inputBox"
            // style={{
            //   border: user.name === "" ? "1px solid red" : "",
            // }}
            style={{
              width: "100%",
            }}
          >
            <input
              // placeholder="Name"
              // className="form-input1"
              type="text"
              onChange={usernameChange}
              name="name"
              value={user.name}
              required="required"
            />
            <span>
              <AiOutlineUser className="form-icons1" /> Name
            </span>
          </div>

          <div
            className="inputBox"
            style={{
              width: "100%",
            }}
          >
            <input
              // placeholder="Email"
              // className="form-input1"
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

          <div
            className="inputBox"
            style={{
              width: "100%",
            }}
          >
            <input
              // className="form-input1"
              type="password"
              onChange={usernameChange}
              name="password"
              value={user.password}
              required="required"
            />
            <span>
              <RiLockPasswordLine className="form-icons1" /> Password
            </span>
          </div>

          <div
            className="inputBox"
            style={{
              width: "100%",
            }}
          >
            <input
              // className="form-input1"
              type="text"
              onChange={usernameChange}
              name="designation"
              value={user.designation}
              required="required"
            />
            <span
            // style={{
            //   display: "flex",
            //   justifyContent: "space-between",
            //   alignItems: "center",
            // }}
            >
              <AiOutlineAntDesign className="form-icons1" /> Designation
            </span>
          </div>

          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) => setUser({ ...user, profilePic: base64 })}
          />

          <div className="inputBox">
            <select
              // className="employee-type"
              name="role"
              onChange={usernameChange}
              required="required"
            >
              <option disabled selected hidden>
                Please select role of Employee
              </option>
              <option value="teamleader">Team Leades</option>
            </select>
          </div>
          {user.name !== "" &&
            user.role !== "" &&
            user.username !== "" &&
            user.password && (
              <button className="signup-btn new-add-signup-btn" type="submit">
                Add team
              </button>
            )}
        </form>
      </Modal>
    </>
  );
};

export default AdminAddTeams;
