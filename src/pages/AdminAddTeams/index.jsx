import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { AiOutlineUser, AiOutlineAntDesign } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine, RiTeamLine } from "react-icons/ri";
import FileBase64 from "react-file-base64";
import "./index.css";
import { useSelector } from "react-redux";

import { API } from "../../data/apicall";

const AdminAddTeams = ({ addTeams, setAddTeams, getAllTeamsByAdmin }) => {
  const UUU = useSelector((state) => state.authReducer.authData);

  const [user, setUser] = useState({
    head: UUU[0]?.id,
    name: "",
    username: "",
    password: "",
    role: "teamleader",
    designation: "",
    profilePic: "",
  });

  // const setHead = () => {
  //   setUser({ ...user, head: UUU._id });
  // };
  // setHead();

  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const theme = useMantineTheme();

  const submitForm = async (e) => {
    e.preventDefault();

    API.post("/auth/register", user)
      .then((res) => {
        setAddTeams(false);
        console.log(res.data);
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
            style={{
              width: "100%",
            }}
          >
            <input
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
                Add team
              </button>
            )}
        </form>
      </Modal>
    </>
  );
};

export default AdminAddTeams;
