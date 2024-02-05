import React, { useState } from "react";
import "./index.css";
// import { IoIosCloseCircleOutline } from "react-icons/io";
import { Modal, useMantineTheme } from "@mantine/core";
import FileBase64 from "react-file-base64";
import { AiOutlineUser, AiOutlineAntDesign } from "react-icons/ai";
import axios from "axios";
import { useSelector } from "react-redux";
import { API } from "../../data/apicall";

const ProfileEditModal = ({ editProfileModal, setEditProfileModal }) => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [userEdit, setUserEdit] = useState({
    profilepic: UUU[0]?.profilepic,
    name: UUU[0]?.name,

    designation: UUU[0]?.designation,
  });

  const usernameChange = (e) => {
    setUserEdit({ ...userEdit, [e.target.name]: e.target.value });
  };

  const editSubmitTask = (e) => {
    e.preventDefault();
    const id = UUU[0]?.id;

    API.put(`auth/profile/edit/${id}`, userEdit)
      .then((res) => {
        setEditProfileModal(false);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const theme = useMantineTheme();

  return (
    <>
      <Modal
        centered
        opened={editProfileModal}
        onClose={() => setEditProfileModal(false)}
        title="Edit task"
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
        <form onSubmit={editSubmitTask} className="profile-form">
          <div className="form-input-container1">
            <AiOutlineUser className="form-icons1" />
            <input
              placeholder="Name"
              className="form-input1"
              type="text"
              onChange={usernameChange}
              name="name"
              value={userEdit.name}
            />
          </div>
          <div className="form-input-container1">
            <AiOutlineAntDesign className="form-icons1" />
            <input
              placeholder="Designation"
              className="form-input1"
              type="text"
              onChange={usernameChange}
              name="designation"
              value={userEdit.designation}
            />
          </div>

          <FileBase64
            type="file"
            multiple={false}
            className="file-card"
            value={userEdit.profilepic}
            onDone={({ base64 }) =>
              setUserEdit({ ...userEdit, profilepic: base64 })
            }
          />
          <button
            style={{
              backgroundColor: "#65a3c2",
            }}
            className="login-btn"
            type="submit"
          >
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ProfileEditModal;
