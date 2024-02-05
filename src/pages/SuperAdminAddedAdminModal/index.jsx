import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { AiOutlineUser, AiOutlineAntDesign } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine, RiTeamLine } from "react-icons/ri";
import FileBase64 from "react-file-base64";
import "./index.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { API } from "../../data/apicall";

const SuperAdminAddedAdminModal = ({
  superAdminModal,
  setSuperAdminModal,
  getAllTeamsByAdmin,
}) => {
  const UUU = useSelector((state) => state.authReducer.authData);

  //   console.log(UUU);
  //console.log(UUU._id);

  //const [profilePic, setProfilePic] = useState("");

  const [user, setUser] = useState({
    head: UUU[0]?.id,
    name: "",
    username: "",
    password: "",
    role: "admin",
    designation: "",
    profilePic: "",
  });

  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const theme = useMantineTheme();

  const submitForm = async (e) => {
    e.preventDefault();

    // const API = axios.create({
    //   baseURL: "http:localhost",
    // });

    API.post("/auth/register", user)
      .then((res) => {
        setSuperAdminModal(false);
        getAllTeamsByAdmin();
      })
      .catch((e) => {
        console.log(e);
      });

    setUser({
      name: "",
      username: "",
      password: "",
      designation: "",
      profilePic: "",
    });
  };

  console.log(user);

  return (
    <>
      <Modal
        centered
        opened={superAdminModal}
        onClose={() => setSuperAdminModal(false)}
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
              width: "100%",
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
              width: "100%",
            }}
          >
            <input
              // placeholder="Password"
              // className="form-input"
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
              // placeholder="Designation"
              // className="form-input"
              type="text"
              onChange={usernameChange}
              name="designation"
              required="required"
              value={user.designation}
            />
            <span>
              <AiOutlineAntDesign className="form-icons1" /> Designation
            </span>
          </div>

          {/* <div className="form-input-container">
            <AiOutlineAntDesign className="form-icons" />
            <input
              placeholder="Designation"
              className="form-input"
              type="file"
              onChange={profilePicChange}
              name="profilePic"
              //value={user.profilePic}
            />
          </div> */}
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) => setUser({ ...user, profilePic: base64 })}
          />

          {user.name !== "" &&
            user.role !== "" &&
            user.username !== "" &&
            user.password && (
              <button className="login-btn" type="submit">
                Add Admin
              </button>
            )}
        </form>
      </Modal>
    </>
  );
};

export default SuperAdminAddedAdminModal;
