import React, { useState } from "react";
import "./index.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";

import { Modal, useMantineTheme } from "@mantine/core";

const EmployeAddModal = ({
  taskAddModal,
  setTaskAddModal,
  teamUserList,
  getTeamOfTeaks,
  teamLeaderTask,
}) => {
  const UUU = useSelector((state) => state.authReducer.authData);

  const [taskAdd, setTaskAddr] = useState({
    task: "",
    status: "",
    username: "",
    description: "",
    date: "",
    head: UUU._id,
    createdate: "",
    project_id: "",
  });

  const taskAddFun = (e) => {
    setTaskAddr({ ...taskAdd, [e.target.name]: e.target.value });
  };

  const addTaskSubmit = (e) => {
    e.preventDefault();

    const API = axios.create({
      baseURL: "https://server-bt-tasks.onrender.com",
    });

    API.post("/tasks/addtaks", taskAdd)
      .then((res) => {
        //console.log(res.data);

        setTaskAddModal(false);
        getTeamOfTeaks();
      })
      .catch((e) => {
        console.log(e);
      });
    setTaskAddr({
      task: "",
      status: "",
      username: "",
      description: "",
      createdate: "",
      project_id: "",
    });
  };

  const theme = useMantineTheme();

  // console.log(taskAdd);

  // const changeDateFromAddTask = (e) => {
  //   console.log(e.target.value);
  // };

  //console.log(taskAdd);

  return (
    <>
      <Modal
        centered
        size="60%"
        opened={taskAddModal}
        onClose={() => setTaskAddModal(false)}
        title="Add Task"
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
          onSubmit={addTaskSubmit}
          style={{
            marginTop: "20px",
          }}
        >
          <div className="all-input-container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                className="inputBox"
                style={{
                  width: "70%",
                }}
              >
                <input
                  // className="modal-input-text"
                  type="text"
                  // placeholder=""
                  name="task"
                  onChange={taskAddFun}
                  required="required"
                />
                <span>taskname</span>
              </div>
              <div className="radios-buttons">
                <label htmlfor="incomplete">incompleted</label>
                <input
                  id="incomplete"
                  name="status"
                  onChange={taskAddFun}
                  type="checkbox"
                  value="In-completed"
                />
              </div>
            </div>
            <div className="inputBox">
              <select
                name="username"
                className="task-selected"
                onChange={taskAddFun}
                style={{
                  width: "100%",
                }}
              >
                <option disabled selected hidden>
                  Plase select Employee
                </option>
                {/* {teamUserList.map((each) => (
                <option>{each.name}</option>
              ))} */}
                {/* new added task based on username */}
                {teamUserList.map((each, index) => (
                  <option key={index}>{each.username}</option>
                ))}
              </select>
            </div>
          </div>
          <div
            className="inputBox"
            style={{
              margin: "10px 0px",
              height: "30px",
              padding: "0px 5px",
              display: "flex",
              height: "40px",
              width: "101%",
            }}
          >
            <input
              type="datetime-local"
              id="birthday"
              name="createdate"
              onChange={taskAddFun}
              required="required"
              // className="modal-input-text  date-input"
            />
            <span>Create Date</span>
          </div>
          <div
            className="inputBox"
            style={{
              margin: "10px 0px",
              height: "30px",
              padding: "0px 5px",
              height: "40px",
              width: "101%",
            }}
          >
            <input
              type="datetime-local"
              id="birthday"
              name="date"
              onChange={taskAddFun}
              required="required"
              // className="modal-input-text  date-input"
            />
            <span>Expert Date</span>
          </div>
          <div className="inputBox" style={{ marginBottom: "10px" }}>
            <select
              // className="employee-type"
              name="project_id"
              onChange={taskAddFun}
              style={{
                width: "100%",
              }}
            >
              {teamLeaderTask?.map((each, index) => (
                <>
                  <option disabled selected hidden>
                    Please select project Id
                  </option>
                  <option key={index} value={each.project_id}>
                    {each.project_id}
                  </option>
                </>
              ))}
            </select>
          </div>
          <textarea
            name="description"
            className="inputBox"
            style={{
              border: "1px solid rgba(83, 81, 81, 0.25)",
              borderRadius: "5px",
              outline: "none",
            }}
            rows="6"
            onChange={taskAddFun}
            cols="60"
          ></textarea>
          <div>
            {taskAdd.task !== "" &&
              taskAdd.status !== "" &&
              taskAdd.username !== "" &&
              taskAdd.description && (
                <button className="login-btn" type="submit">
                  Submit
                </button>
              )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EmployeAddModal;
