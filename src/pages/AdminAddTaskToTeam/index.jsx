import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { Modal, useMantineTheme } from "@mantine/core";

const AdminAddTaskToTeam = ({
  adminAddTask,
  setAdminAddTask,
  adminAllTeams,
}) => {
  const UUU = useSelector((state) => state.authReducer.authData);

  const [taskAdd, setTaskAddr] = useState({
    head: UUU._id,
    task: "",
    status: "",
    username: "",
    description: "",
    date: "",
    createdate: "",
    project_id: "",
    //head: UUU.role,
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

        setAdminAddTask(false);
        // getTeamOfTeaks();
      })
      .catch((e) => {
        console.log(e);
      });
    setTaskAddr({
      task: "",
      status: "",
      username: "",
      description: "",
      date: "",
      // new addded
      head: UUU.role,
      createdate: "",
      project_id: "",
      //head: UUU._id,
    });
  };

  const theme = useMantineTheme();

  //console.log(taskAdd);

  return (
    <>
      <Modal
        centered
        size="47%"
        opened={adminAddTask}
        onClose={() => setAdminAddTask(false)}
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
            marginTop: "10px",
          }}
        >
          <div className="all-input-container">
            <div
              className="inputBox"
              style={{
                width: "100%",
              }}
            >
              <input
                // className="modal-input-text project-id"
                type="text"
                // placeholder="project-id"
                name="project_id"
                onChange={taskAddFun}
                required="required"
              />
              <span>project-id</span>
            </div>

            <div
              style={{
                display: "flex",
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
                  name="task"
                  onChange={taskAddFun}
                  required="required"
                />
                <span>project-name</span>
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

            <div
              className="inputBox"
              style={{
                width: "100%",
              }}
            >
              <select
                name="username"
                className="task-selected"
                onChange={taskAddFun}
                // required="required"
                style={{
                  width: "100%",
                }}
              >
                <option disabled selected hidden>
                  Plase select Employee
                </option>
                {/* {adminAllTeams.map((each) => (
                <option>{each.name}</option>
              ))} */}
                {/* add new */}
                {adminAllTeams.map((each) => (
                  <option>{each.username}</option>
                ))}
              </select>
            </div>
          </div>
          <div
            className="inputBox"
            style={{
              margin: "10px 0px",
              height: "40px",
              padding: "0px 5px",
              display: "flex",
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
            <span>Create Date :</span>
          </div>
          <div
            className="inputBox"
            style={{
              margin: "10px 0px",
              height: "40px",
              padding: "0px 5px",
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
          <textarea
            name="description"
            style={{
              border: "1px solid rgba(83, 81, 81, 0.25)",
              borderRadius: "5px",
              outline: "none",
            }}
            className="inputBox"
            rows="6"
            onChange={taskAddFun}
            cols="60"
          ></textarea>
          <div>
            {taskAdd.task !== "" &&
              taskAdd.status !== "" &&
              taskAdd.username !== "" &&
              taskAdd.description !== "" &&
              taskAdd.date !== "" && (
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

export default AdminAddTaskToTeam;
