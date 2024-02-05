import React, { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import "./index.css";
import EmployeAddModal from "../EmployeAddModal";

import Header from "../Header";
import { useSelector } from "react-redux";
import axios from "axios";
import AddUserTeamModal from "../AddUserTeamModal";
import TeamLeadTaska from "../TeamLeadTasks";
import { AiOutlineDelete } from "react-icons/ai";
import TeamDeleteTaskModal from "../TeamDeleteTaskModal";
import UserModal from "../UserModal";

import { GoProject } from "react-icons/go";

import ReactApexChart from "react-apexcharts";
import ProjectIdModal from "../ProjectIdModal/projectIdModal";
import { API } from "../../data/apicall";

const Teams = ({ changeDarkMode, darkMode }) => {
  // teams leader states
  //
  //

  const [addUserModal, setAddUserModal] = useState(false);

  const [taskAddModal, setTaskAddModal] = useState(false);

  // team leader all employess state
  const [teamUserList, setTeamUserList] = useState([]);

  // employess all task state variable
  const [teamAllTask, setTeamAllTask] = useState([]);

  // team leader task state variable
  const [teamLeaderTask, setTeamLeaderTask] = useState([]);

  //
  // const [teamDeleteTask, setTeamDeleteTask] = useState(false);

  // const [deletedTaskDetails, setDeletedTaskDetails] = useState("");

  const [clickUserHighletColor, setClickUserHighletColor] = useState(false);

  const [clickUserHighletColorByName, setClickUserHighletColorByName] =
    useState("");

  const [description, setDescription] = useState("");

  const [modal, setModal] = useState(false);

  //
  //
  //
  // teams leader end states variables
  //
  // =======================================================================
  //
  // admin state variable start container
  //
  //

  // admin change drop down to fetch corresponding task fetch
  const [adminChangeTeamValue, setAdminChangeTeamValue] = useState("");

  const [adminTeams, setAdminTeams] = useState([]);

  const [adminGetOneTeam, setAdminGetOneTeam] = useState([]);

  const [totalCalHour, setTotalCalHour] = useState("");

  const [completedHour, setCompletedHour] = useState("");

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  const [projectModal, setProjectModal] = useState(false);

  const [projectSetUserId, setProjectSetUserId] = useState("");

  //
  //
  // admin state variable end container
  //
  //  ==================================================================================

  // pagination start container
  //
  //

  //========semi pie char ================
  const [options, setOptions] = useState({
    chart: {
      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
      },
    },
    grid: {
      padding: {
        bottom: -80,
      },
    },
    labels: ["Completed", "Incompleted"],
    colors: ["#0a5c0d", "#b52134"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  const [update, setUpdate] = useState([44, 55]);

  const fontColor = darkMode ? "#65a3c2" : "rgb(37, 51, 58)";

  //  ===============semi -pie chart===============

  const [currentPage, setCurrentPage] = useState(0);

  const [pageSize, setPageSize] = useState(2);

  const [currentItems, setCurrentItems] = useState(
    teamUserList.slice(0, pageSize)
  );

  const onPage = (index) => {
    setCurrentPage(index);
    let cuurentItem = teamUserList.slice(
      index * pageSize,
      pageSize * (index + 1)
    );
    setCurrentItems(cuurentItem);
    setTotalCalHour("");
    setCompletedHour("");
  };
  //
  //
  // pagination end container
  // ===========================================================================================
  const UUU = useSelector((state) => state.authReducer.authData);

  // const teamUserAccess = { role: UUU.role };

  // access the all employee corresponding there teams
  const nameValue = adminGetOneTeam[0];

  //const { _id } = nameValue;

  const teamUserAccess =
    UUU[0]?.role === "admin" ? { role: nameValue?._id } : { role: UUU[0]?.id }; //{ role: UUU.role };   --- "" replace { role: nameValue?._id }

  // console.log(teamUserAccess);

  // acces team leader and there task only
  const adminAndTams =
    UUU[0]?.role === "admin"
      ? { role: adminChangeTeamValue }
      : { role: UUU[0]?.id }; //{ role: UUU.role };
  //
  // ========================------------==================================--------------------------========
  // by click the employee corresponding task loaded apis start

  const getData = (n) => {
    //console.log(`===${n}`);
    // getTeamOfTeaks(n);
    setClickUserHighletColor(true);
    setClickUserHighletColorByName(n);
    setTotalCalHour("");
    setCompletedHour("");
  };

  //
  //
  //
  // by click the employee corresponding task loaded apis end
  //
  // ==========================================================================
  //
  // calculate the task percentage start container
  //
  //

  // ******************************************************** loder container
  let loaderValue = 0;

  const filtee = teamAllTask.filter((each) => each.status === "completed");

  const compl = Math.round((filtee.length / teamAllTask.length) * 100);

  if (compl >= 0) {
    loaderValue = compl;
  } else {
    loaderValue = 0;
  }

  const allCalculation = () => {
    const filterPieValue = teamAllTask.filter(
      (each) => each.status === "completed"
    );
    const compl = (filterPieValue.length / teamAllTask.length) * 100;
    if (compl === 100) {
      let a = [100, 0];
      setUpdate(a);
    } else {
      let arr = [];
      arr.push(Math.round(compl));
      arr.push(100 - Math.round(compl));
      setUpdate(arr);
    }
  };

  useEffect(() => {
    allCalculation();
  }, [teamAllTask]);

  // ******************************************************** loder container end

  //
  //
  // calculate the task percentage start container
  //
  // ===============================================================================
  //
  // admin change dropdown corresponding teams display start
  //
  //

  // $$$$$$$$$$$$$$$$$$$$$$ admin drop down

  const adminChangeTeam = (e) => {
    console.log(e.target.value);
    setCurrentItems([]);
    setAdminChangeTeamValue(e.target.value);
  };

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // team leader employees fetch api call change to specific project click corresponding employee fecth

  const getTeamOfEmployee = async () => {
    API.post("/team/user", teamUserAccess)
      .then((res) => {
        setTeamUserList(res.data);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  // admindrop down change corresponding employes get useEffect start

  useEffect(() => {
    getTeamOfEmployee();
    // getTeamOfTeaks();
    getUserTask();
  }, [adminGetOneTeam]);

  // admindrop down change corresponding employes get useEffect end

  //
  //
  //
  // team leader all employees get api call end container
  // -------------------------------------------------------------------------------
  // get team leader all task fetch api start container --if login as team leader--
  //
  //
  //

  const getUserTask = async () => {
    // new addedd get team taskd

    const userName = { username: UUU[0]?.username };
    // console.log(userName);
    API.post("/tasks/teamleader/task", userName)
      .then((res) => {
        setTeamLeaderTask(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ====================================================================
  //
  // details icons click to open details modal start
  //

  const detailsAndModel = (event) => {
    const desc = teamAllTask.filter(
      (each) => each._id === event.currentTarget.id
    );
    //console.log(desc[0].description);
    setDescription(desc[0].description);
    setModal(true);
  };
  //
  //  details icons click to open details modal start
  //

  useEffect(() => {
    // get team leader task container start --if login as admin--
    // $$$$$$$$$$$$$$$$$$$$$$$$$$ admin apic
    const getVVVaa = () => {
      if (UUU.role === "admin" && adminGetOneTeam.length !== 0) {
        const nameValue = adminGetOneTeam[0];

        //==============================================

        const { username } = nameValue;
        const value = { username: username };
        //console.log(`===========${username}`);

        const API = axios.create({
          baseURL: "https://server-bt-tasks.onrender.com",
        });
        API.post("/tasks/teamleader/task", value)
          .then((res) => {
            setTeamLeaderTask(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };
    getVVVaa();
    // get team leader task container end --if login as admin--
  }, [adminGetOneTeam]);

  // initial useEffect method
  useEffect(() => {
    getTeamOfEmployee();
    getUserTask();
    // getTeamOfTeaks();

    //==============================================================================
    // login admin show the team leader in drop down list start container
    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ admin apis
    if (UUU.role === "admin") {
      const adminrole = { role: UUU.role };

      const getAllTeamsByAdmin = () => {
        const API = axios.create({
          baseURL: "https://server-bt-tasks.onrender.com",
        });
        // if admin open drop down add select team old modal

        // ======== admin fetch data based on admin id

        API.get(`team/admin/team/${UUU._id}`)
          .then((res) => {
            // setTeamUserList(res.data);
            setAdminTeams(res.data);
          })

          .catch((e) => {
            console.log(e);
          });
      };

      getAllTeamsByAdmin();
    }

    // login admin show the team leader in drop down list start container

    // api call fetch teams leader data
    const getOneTeamLeader = () => {
      const API = axios.create({
        baseURL: "https://server-bt-tasks.onrender.com",
      });

      API.post("/team/oneteamleader", adminAndTams)
        .then((res) => {
          setAdminGetOneTeam(res.data);
        })

        .catch((e) => {
          console.log(e);
        });
    };
    getOneTeamLeader();
    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ admin apis

    // api call fetch team leader data end
  }, [adminChangeTeamValue]);

  const v = Math.ceil(teamUserList.length / pageSize);

  const projectIdValueUpdate = (id) => {
    setProjectModal(true);
    setProjectSetUserId(id);
  };

  return (
    <div className="teams">
      <div className="right-side-team">
        <div className="new-header-user">
          <Header changeDarkMode={changeDarkMode} darkMode={darkMode} />
        </div>
        <div className="team-right-side-container">
          {/* login user details container start */}
          <div
            className="team-leade-container"
            style={{
              marginTop: "30px",
            }}
          >
            <div className="employee-image-container">
              <img className="new-pic-img" src={UUU[0]?.profilepic} alt="pic" />
              <div>
                <h3
                  className="employee-name"
                  style={{
                    color: fontColor,
                  }}
                >
                  {UUU[0]?.name.charAt(0).toUpperCase() + UUU[0]?.name.slice(1)}
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

            {UUU.role === "admin" ? (
              <div className="selected">
                <select onChange={adminChangeTeam}>
                  <option disabled selected hidden>
                    Please select team
                  </option>
                  {adminTeams.map((each) => (
                    <option>{each.username}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="team-add-user-container">
                <div>
                  <button
                    onClick={() => setAddUserModal(true)}
                    className="add-user-btn"
                    style={{
                      color: darkMode ? "#ffffff" : "",
                    }}
                  >
                    Add an Employee
                  </button>
                </div>
                <button className="add-task-button">
                  <button onClick={() => setTaskAddModal(true)}>
                    Add Task to Users
                  </button>
                </button>
              </div>
            )}
          </div>
          {/* login user details container end */}
          {/* add team leaders */}
          {/* login admin show the team leader details start container */}
          {adminChangeTeamValue && (
            <div
              className="admin-teams-con"
              style={{
                marginBottom: "30px",

                boxShadow: darkMode
                  ? "rgba(149, 157, 165, 0.2) 0px 8px 24px"
                  : "",
              }}
            >
              {adminGetOneTeam.map((each, index) => (
                <li key={index} className="team-card-inadmin">
                  <div className="user-details-container">
                    <h3
                      className="team-name"
                      style={{
                        color: darkMode ? "#ffffff" : "",
                      }}
                    >
                      Team Leader{" "}
                      <span>
                        {each.name.charAt(0).toUpperCase() + each.name.slice(1)}
                      </span>
                    </h3>
                    <p className="user-designation">
                      Designation {each.designation}
                    </p>
                  </div>
                  <img
                    src={each.profilePic} //"https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
                    className="admin-team-image"
                    alt="avatar"
                  />
                </li>
              ))}
            </div>
          )}

          {/* login admin show the team leader details end container */}

          {/* show team leader task  collapss container */}

          {/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */}

          {teamUserList.length !== 0 && (
            <div className="user-and-2">
              <ul
                className="ul-container"
                // style={{
                //   border: darkMode ? "1px solid #ffffff" : "",
                // }}
              >
                {/* page count user list add */}
                {currentItems.map((i, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <li
                      key={index}
                      className="user-card-container"
                      onClick={() => getData(i.username)}
                      style={{
                        backgroundColor:
                          clickUserHighletColorByName === i.name &&
                          clickUserHighletColor &&
                          "#edeceb",
                        borderRadius:
                          clickUserHighletColorByName === i.name &&
                          clickUserHighletColor &&
                          "3px",
                      }}
                    >
                      <img
                        src={i.profilepic} //"./images/photo-1494790108377-be9c29b29330.jpg"
                        className="avatar"
                        alt="avatar"
                      />
                      <div className="user-details-container">
                        <h3 className="user-name">
                          {i.name.charAt(0).toUpperCase() + i.name.slice(1)}
                        </h3>
                        <p className="user-designation"> {i.designation} </p>
                      </div>
                      {/* <div style={{ maginLeft: "50px" }}>
                        {teamLeaderTask.map((each) => (
                          // <select>
                          //   <option value={each.project_id}>
                          //     {each.project_id}
                          //   </option>
                          // </select>
                          <>
                            <input
                              value={each.project_id}
                              type="checkbox"
                              id="inp"
                            />
                            <label>{each.project_id}</label>
                          </>
                        ))}
                      </div> */}
                    </li>
                    {/* {UUU.role !== "admin" && (
                      <li>
                        <GoProject
                          onClick={() => projectIdValueUpdate(i._id)}
                        />
                      </li>
                    )} */}

                    <li
                      style={{
                        color: darkMode ? "#ffffff" : "",
                      }}
                    >
                      <GoProject onClick={() => projectIdValueUpdate(i._id)} />
                    </li>
                  </div>
                ))}
              </ul>
              <div>
                <button
                  className="prev-btn"
                  onClick={() => onPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  style={{
                    color: darkMode ? "#ffffff" : "",
                  }}
                >
                  prev
                </button>
                {Array(v)
                  .fill(null)
                  .map((page, index) => (
                    <button
                      className="number-btn"
                      style={{
                        width: "17px",
                        color: darkMode ? "#ffffff" : "",
                      }}
                      onClick={() => onPage(index)}
                      key={index}
                    >
                      {index + 1}
                    </button>
                  ))}
                <button
                  onClick={() => onPage(currentPage + 1)}
                  disabled={currentPage === v - 1}
                  className="prev-btn"
                  style={{
                    color: darkMode ? "#ffffff" : "",
                  }}
                >
                  next
                </button>
              </div>
            </div>
          )}

          {/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */}

          {teamLeaderTask.length !== 0 && (
            <div className="team-leader-task-collaps">
              <TeamLeadTaska
                teamLeaderTask={teamLeaderTask}
                getUserTask={getUserTask}
                darkMode={darkMode}
              />
            </div>
          )}

          {/* show team leader task  collapss container */}

          {/* add team leader end */}

          {/* employee all task by click employee image start container */}
          {teamAllTask.length !== 0 ? <>""</> : ""}
          {/* employee all task end container */}

          {/* details and edit modals start container */}
          {/* task details modal start */}
          <UserModal
            modal={modal}
            setModal={setModal}
            datilsTask={description}
          />
          {/* task details modal end */}
          {/* ==================================================== */}
          {/* employee add task modal start */}

          <EmployeAddModal
            taskAddModal={taskAddModal}
            setTaskAddModal={setTaskAddModal}
            teamUserList={teamUserList} //user list show drop down form added task
            // getTeamOfTeaks={getTeamOfTeaks}
            getTeamOfTeaks={getUserTask} // teamleader task
            teamLeaderTask={teamLeaderTask} //completed
          />

          {/* employee add task modal end */}
          {/* ================================================== */}
          {/* employe added to team modal start */}
          <AddUserTeamModal
            addUserModal={addUserModal}
            setAddUserModal={setAddUserModal}
            getTeamOfEmployee={getTeamOfEmployee}
            //teamleader task props below
            teamLeaderTask={teamLeaderTask}
          />

          {/* employe added to team modal end */}
          {/* =============================================== */}
          {/* task delete modal start */}

          {/* <TeamDeleteTaskModal
            setTeamDeleteTask={setTeamDeleteTask}
            teamDeleteTask={teamDeleteTask}
            deletedTaskDetails={deletedTaskDetails}
            getTeamOfTeaks={getTeamOfTeaks}
          /> */}

          <ProjectIdModal
            setProjectModal={setProjectModal}
            projectModal={projectModal}
            teamLeaderTask={teamLeaderTask}
            projectSetUserId={projectSetUserId}
          />

          {/* task delete modal end */}
          {/* ========================= */}
          {/* details and edit modal end container */}
        </div>
      </div>
    </div>
  );
};

export default Teams;
