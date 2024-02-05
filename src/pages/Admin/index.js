import React, { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import { MdAddTask } from "react-icons/md";
import "./index.css";

import Header from "../Header";
import AdminAddTeams from "../AdminAddTeams";
import axios from "axios";
import { useSelector } from "react-redux";
import AdminAddTaskToTeam from "../AdminAddTaskToTeam";
// import User from "../Users";

import { RiDeleteBin5Line } from "react-icons/ri";
import AdminDeleteTeamsModal from "../AdminDeleteTeamsModal";
import { API } from "../../data/apicall";

const taskStatus = ["completed", "In-completed", "In-progress"];

const Admin = ({ changeDarkMode, darkMode }) => {
  const [addTeams, setAddTeams] = useState(false);

  const [adminAddTask, setAdminAddTask] = useState(false);

  const [adminAllTeams, setAdminAllTeams] = useState([]);

  const [loading, setLoading] = useState(false);

  const [deletedTeams, setDeletedTeams] = useState([]);

  const [adminDeleteModal, setAdminDeleteModal] = useState(false);

  const [accessAllProjectToAdmin, setAccessAllProjectToAdmin] = useState([]);

  const [selectedDropDwonAdmin, setSelectedDropDwonAdmin] = useState("");

  const [
    adminClickSpecificTaskCoressTaskFetch,
    setAdminClickSpecificTaskCoressTaskFetch,
  ] = useState([]);

  const [totalTaskProject, setTotalTaskProject] = useState("");

  const [completedTaskProject, setCompletedTaskProject] = useState("");

  const UUU = useSelector((state) => state.authReducer.authData);

  const getAllTeamsByAdmin = () => {
    setLoading(true);
    API.get(`team/admin/team/${UUU[0]?.id}`)
      .then((res) => {
        // setTeamUserList(res.data);
        // console.log(res.data);
        setAdminAllTeams(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const accessAllProjectsToAdmin = () => {
    API.get(`/tasks/admin/allprojects/${UUU[0]?.id}`)
      .then((res) => {
        // setTeamUserList(res.data);

        setAccessAllProjectToAdmin(res.data);
        // setLoading(false);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllTeamsByAdmin();
    // accessAllProjectsToAdmin();
  }, []);

  // console.log(adminAllTeams);

  const deletedAdminToTeamLeadr = (event) => {
    const desc = adminAllTeams.filter(
      (each) => each._id === event.currentTarget.id
    );
    console.log(desc);
    setDeletedTeams(desc[0]);
    setAdminDeleteModal(true);
  };

  const adminChangeTeam = (e) => {
    setSelectedDropDwonAdmin(e.target.value);
  };

  const valuesFilter = accessAllProjectToAdmin.filter(
    (each) => each.status === selectedDropDwonAdmin
  );

  const fetchTheOneOfTask = (id) => {
    const API = axios.create({
      baseURL: "https://server-bt-tasks.onrender.com",
    });
    const sss = {
      project_id: id,
    };

    API.post("/tasks/admin/project/idbase", sss)
      .then((res) => {
        // setTeamUserList(res.data);

        setAdminClickSpecificTaskCoressTaskFetch(res.data);
        //setLoading(false);
      })

      .catch((e) => {
        console.log(e);
      });
  };
  // console.log(adminClickSpecificTaskCoressTaskFetch);

  // adminClickSpecificTaskCoressTaskFetch?.shift();

  let newArray = adminClickSpecificTaskCoressTaskFetch.slice(1);

  // console.log(newArray);

  const newArrayLength = newArray.length;

  const filterPieValue = newArray?.filter(
    (each) => each.status === "completed"
  );

  const fontColor = darkMode ? "#65a3c2" : "rgb(37, 51, 58)";

  return (
    <>
      <div className="admin">
        <div className="right-a">
          <Header changeDarkMode={changeDarkMode} darkMode={darkMode} />
          {/* add team and task container */}
          <div className="admin-image-container">
            <div className="employee-image-container">
              <img className="new-pic-img" src={UUU[0]?.profilepic} alt="pic" />
              <div>
                <h3
                  className="employee-name"
                  style={{
                    color: fontColor,
                  }}
                >
                  {/* excvghbjnkml, */}
                  {UUU[0]?.name?.charAt(0).toUpperCase() +
                    UUU[0]?.name?.slice(1)}
                </h3>
                <p
                  style={{
                    color: fontColor,
                  }}
                >
                  {UUU[0]?.designation}
                </p>
              </div>
            </div>
            <div className="admin-add-btn">
              <button
                className="admin-left-btn"
                onClick={() => setAddTeams(true)}
              >
                Add Teams
              </button>
              <button
                className="admin-right-btn"
                onClick={() => setAdminAddTask(true)}
                style={{
                  color: darkMode ? "#ffffff" : "",
                }}
              >
                Add Project to Teams
              </button>
            </div>
          </div>

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              <SpinnerCircular enabled={loading} />
            </div>
          ) : (
            <div className="admin-employee-f-container">
              {adminAllTeams.map((each, index) => (
                <div className="admin-employess-s-container" key={index}>
                  <img
                    className="admin-employee-images-card"
                    src={each.profilepic}
                    alt=""
                  />
                  <div className="admin-team-delete">
                    <RiDeleteBin5Line
                      id={each._id}
                      onClick={deletedAdminToTeamLeadr}
                    />
                  </div>
                  <p className="para-name">
                    {each.name.charAt(0).toUpperCase() + each.name.slice(1)}
                  </p>
                  <p className="admin-emp-role">
                    <span>{each.designation}</span>
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* all projects list show container */}

          {/* {newArrayLength.length !== 0 && (
            <div>
              <p>
                Total task
                <span>{newArrayLength}</span>
              </p>
              <p>
                completed task
                <span>{filterPieValue.length}</span>
              </p>
            </div>
          )} */}

          {accessAllProjectToAdmin.length !== 0 && (
            <div className="selectAdminChangeValue">
              <div
                style={{
                  width: "40%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* {newArrayLength.length !== 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <p
                      style={{
                        color: "#cec5b6",
                        fontSize: "18px",
                        fontWeight: "700",
                      }}
                    >
                      Total task
                      <span className="admin-project-count">
                        {newArrayLength}
                      </span>
                    </p>
                    <p
                      style={{
                        color: "#cec5b6",
                        fontSize: "18px",
                        fontWeight: "700",
                      }}
                    >
                      completed task
                      <span className="admin-project-count">
                        {filterPieValue.length}
                      </span>
                    </p>
                  </div>
                )} */}
                {/*  */}
                <div
                  className="admin-employee-f-container"
                  style={{
                    marginRight: "30px",
                  }}
                >
                  <div id="new-admin-employee-s-container">
                    <MdAddTask className="new-task-icon" />
                    <div>
                      <p
                        className="task-para"
                        style={{
                          color: darkMode ? "#ffffff" : "",
                        }}
                      >
                        {newArrayLength} Tasks
                      </p>
                      <span className="task-com">completed</span>
                    </div>
                    {/* <div>
                      <span className="task-admin-percentage"
                      
                      >100%</span>
                    </div> */}
                  </div>
                </div>
                <div className="admin-employee-f-container">
                  <div id="new-admin-employee-s-container">
                    <MdAddTask className="new-task-icon" />
                    <div>
                      <p
                        className="task-para"
                        style={{
                          color: darkMode ? "#ffffff" : "",
                        }}
                      >
                        {filterPieValue.length} Tasks
                      </p>
                      <span className="task-com">In-Completed</span>
                    </div>
                  </div>
                </div>
                {/*  */}
              </div>

              {/* drop down list */}
              <div className="selected dropdown">
                <select onChange={adminChangeTeam}>
                  <option disabled selected hidden>
                    Please select status
                  </option>
                  {taskStatus.map((each, index) => (
                    <option key={index}>{each}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <div>
            {/* {valuesFilter.length !== 0()} */}

            {valuesFilter.length !== 0 && (
              <table className="content-table ee">
                <thead>
                  <tr>
                    <th>ProjectId</th>
                    <th>ProjectName</th>
                    <th>UserName</th>
                    <th>CreateDate</th>
                    {/* <th>Update Date</th> */}
                    <th>Expert Date</th>
                    {/* <th>ActualComDate</th>
                  <th>ActualExptDate</th> */}
                    <th>Status</th>
                    {/* <th>Details & Edit</th> */}
                  </tr>
                </thead>
                <tbody
                  style={{
                    color: darkMode ? "#ffffff" : "",
                  }}
                >
                  {valuesFilter.map((each, index) => (
                    <tr
                      key={index}
                      // onClick={() =>
                      //   getTeamTaskCalHour(
                      //     each.createdate,
                      //     each.date,
                      //     // each.status === "completed" ? each.updatedAt : "",
                      //     each.project_id,
                      //     each.actualComDate && each.actualComDate,
                      //     each.actualExptDate && each.actualExptDate
                      //   )
                      // }
                      onClick={() => fetchTheOneOfTask(each.project_id)}
                    >
                      <td>{each.project_id}</td>
                      <td>{each.task}</td>
                      <td>{each.username}</td>
                      <td>{each.createdate}</td>
                      {/* <td>{each.updatedAt.slice(0, 10)}</td> */}
                      <td>{each.date}</td>
                      {/* <td>{each.actualComDate}</td>
                    <td>{each.actualExptDate}</td> */}
                      <td>
                        <div
                          style={{
                            backgroundColor:
                              each.status === "completed"
                                ? "#0e8214" //"#14e610"
                                : each.status === "In-completed"
                                ? "#b52134"
                                : "#b8ad14",
                            fontSize: "16px",
                            fontWeight: 400,
                            padding: "2px",
                            color: "#ffffff",
                            paddingLeft: "19px",
                            borderTopRightRadius: "10px",
                            borderBottomRightRadius: "10px",
                            borderTopLeftRadius: "7px",
                          }}
                        >
                          {each.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* all projects list show container end */}
        </div>
      </div>

      {/* modal */}
      <AdminAddTeams
        setAddTeams={setAddTeams}
        addTeams={addTeams}
        getAllTeamsByAdmin={getAllTeamsByAdmin}
      />
      <AdminAddTaskToTeam
        setAdminAddTask={setAdminAddTask}
        adminAddTask={adminAddTask}
        adminAllTeams={adminAllTeams}
      />
      <AdminDeleteTeamsModal
        setAdminDeleteModal={setAdminDeleteModal}
        deletedTeams={deletedTeams}
        adminDeleteModal={adminDeleteModal}
        getAllTeamsByAdmin={getAllTeamsByAdmin}
      />
    </>
  );
};

export default Admin;
