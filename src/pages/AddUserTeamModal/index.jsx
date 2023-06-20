import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { AiOutlineUser, AiOutlineAntDesign } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import "./index.css";
import { useSelector } from "react-redux";
import FileBase64 from "react-file-base64";
import axios from "axios";

const AddUserTeamModal = ({
  addUserModal,
  setAddUserModal,
  getTeamOfEmployee,
  teamLeaderTask,
}) => {
  const UUU = useSelector((state) => state.authReducer.authData);

  const [user, setUser] = useState({
    name: "",
    role: "",
    username: "",
    password: "",
    //head: UUU.role,
    head: UUU._id,
    designation: "",
    profilePic: "",
    project_id: "",
  });

  const usernameChange = (e) => {
    setUser({ ...user, head: UUU._id });
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const theme = useMantineTheme();

  const submitForm = async (e) => {
    e.preventDefault();

    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.post("/auth/register", user)
      .then((res) => {
        //console.log(`api data ${res.data}`);
        setAddUserModal(false);
        getTeamOfEmployee();
      })
      .catch((e) => {
        console.log(e);
      });

    setUser({
      name: "",
      username: "",
      password: "",
      role: "",
      head: UUU._id,
      designation: "",
      profilePic: "",
      project_id: "",
    });
  };

  // console.log(user);

  return (
    <>
      <Modal
        centered
        opened={addUserModal}
        onClose={() => setAddUserModal(false)}
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
        <form onSubmit={submitForm} className="signup-form">
          <div
            className="inputBox"
            style={{
              width: "107%",
            }}
          >
            <input
              // placeholder="Name"
              // className="form-input"
              type="text"
              onChange={usernameChange}
              name="name"
              value={user.name}
              required="required"
              style={{
                width: "100%",
              }}
            />
            <span>
              <AiOutlineUser className="form-icons1" /> Name
            </span>
          </div>

          <div
            className="inputBox"
            style={{
              width: "107%",
            }}
          >
            <input
              // placeholder="Email"
              // className="form-input"
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
              width: "107%",
            }}
          >
            <input
              // placeholder="Password"
              // className="form-input"
              type="text"
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
              width: "107%",
            }}
          >
            <input
              // placeholder="Designation"
              // className="form-input"
              type="text"
              onChange={usernameChange}
              name="designation"
              value={user.designation}
              required="required"
            />
            <span>
              <AiOutlineAntDesign className="form-icons1" /> Designation
            </span>
          </div>

          {/* <div className="form-input-container">
            <select
              className="employee-type"
              name="project_id"
              onChange={usernameChange}
            >
              {teamLeaderTask?.map((each) => (
                <>
                  <option disabled selected hidden>
                    Please select role of Employee
                  </option>
                  <option value={each.project_id}>{each.project_id}</option>
                </>
              ))}
            </select>
          </div> */}

          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) => setUser({ ...user, profilePic: base64 })}
          />

          <div className="inputBox">
            <select
              name="role"
              onChange={usernameChange}
              style={{
                width: "107%",
              }}
            >
              <option disabled selected hidden>
                Please select role of Employee
              </option>
              <option value="employee">Employee</option>
            </select>
          </div>
          {user.name !== "" &&
            user.role !== "" &&
            user.username !== "" &&
            user.password && (
              <button  className="login-btn" type="submit">
                SignUp
              </button>
            )}
        </form>
      </Modal>
    </>
  );
};

export default AddUserTeamModal;
