import React, { useEffect, useState } from "react";
import "./index.css";
import { BiDetail, BiSearchAlt } from "react-icons/bi";
import UserModal from "../UserModal";
// import SideBar from "../SideBar";
import Header from "../Header";
import axios from "axios";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { FiEdit } from "react-icons/fi";
import UserEditModal from "../UserEditModal";

import { RiEdit2Line } from "react-icons/ri";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";
import { motion } from "framer-motion";
import "./index.css";
import { API } from "../../data/apicall";
const Users = ({ changeDarkMode, darkMode }) => {
  const UUU = useSelector((state) => state.authReducer.authData);
  // console.log(UUU);

  const transition = { type: "spring", duration: 3 };

  const [modal, setModal] = useState(false);
  const [userDataTask, setUserDataTask] = useState([]);

  const [editModal, setEditModal] = useState(false);

  const [editUserTask, setEditUserTask] = useState([]);

  const [update, setUpdate] = useState([]);

  const [inputSearchValue, setInputSearchValue] = useState("");

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //hours cal
  const [completedHour, setCompletedHour] = useState("");

  const [totalCalHour, setTotalCalHour] = useState("");

  const [timerHour, setTimerHour] = useState("");

  const [description, setDescription] = useState("");

  const [userTasKTimer, setUserTaskTimer] = useState([]);

  const [editProfileModal, setEditProfileModal] = useState(false);

  const [taskDescId, setTaskDescId] = useState("");

  const [editProfileUserDetails, setEditProfileUserDetails] = useState([]);

  // $$$$$$$$$$$$$$$$$$$$$$$$$ font color changes %%%%%%%%%%%%%%%%%%%%%%

  const fontColor = darkMode ? "#65a3c2" : "rgb(37, 51, 58)";

  const [options, setOptions] = useState({
    labels: ["Completed", "Incompleted"],
    colors: ["#0a5c0d", "#b52134"], //#14e610  #f53858
  });

  const editAndModel = (each) => {
    // const edit = userDataTask.filter((each) => each._id === e.currentTarget.id);

    setEditUserTask(each);
    setEditModal(true);
  };

  const u = localStorage.getItem("user");

  const detailsAndModel = (event) => {
    // console.log(event);
    // const desc = userDataTask.filter(
    //   (each) => each[0]?.id === event.currentTarget.id
    // );

    //console.log(desc[0].description);
    setDescription(event?.description);
    setModal(true);
    setTaskDescId(event?.id);
    // console.log("details task modal");
  };

  const getUserTask = async () => {
    const userName = { username: UUU[0]?.username };

    API.post("/tasks/teamleader/task", userName)
      .then((res) => {
        setUserDataTask(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const allCalculation = () => {
    const filterPieValue = userDataTask.filter(
      (each) => each.status === "completed"
    );
    const compl = (filterPieValue.length / userDataTask.length) * 100;
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
    getUserTask();
  }, []);

  useEffect(() => {
    allCalculation();
  }, [userDataTask]);

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //  calculate hours task start container

  const searchInput = (e) => {
    // console.log(e.target.value);
    setInputSearchValue(e.target.value);
  };

  //console.log(inputSearchValue);

  const valuesFilter = userDataTask.filter((each) =>
    each.status
      .split("-")[0]
      .concat(each.status.split("-")[1])
      .toLocaleLowerCase()
      .includes(inputSearchValue.toLocaleLowerCase())
  );
  // console.log(valuesFilter);

  useEffect(() => {
    userDataTask?.forEach((each) => {
      setTotalCalHour("");
      setCompletedHour("");
      setTimerHour("");

      let total;
      const date1 = new Date(each.createdate); // start date
      const date2 = new Date(each.date); // exprected date
      const date3 =
        each.status === "completed" ? new Date(each.updatedDate) : "";

      const actualDate = each.actualComDate ? new Date(each.actualComDate) : "";
      const actualExpt = each.actualExptDate
        ? new Date(each.actualExptDate)
        : "";

      if (actualDate !== "" && actualExpt !== "") {
        let diff = (actualExpt.getTime() - actualDate.getTime()) / 1000;
        diff /= 60 * 60;
        let timerOfValue = Math.abs(Math.round(diff));

        if (timerOfValue < 9) {
          total = timerOfValue;
        } else if (timerOfValue > 9 && timerOfValue < 24) {
          let newTotal;
          let firstNewDate = actualDate.toString().slice(0, 15);
          let newFirstValue = `${firstNewDate} 18:30`;
          let firstD = new Date(newFirstValue);

          let firstDiff = (firstD.getTime() - actualDate.getTime()) / 1000;
          firstDiff /= 60 * 60;
          let actualNewFirstValue = Math.abs(Math.round(firstDiff));

          // another second date calculations

          let secondNewDate = actualExpt.toString().slice(0, 15);
          let newSecondValue = `${secondNewDate} 9:30`;
          let secondD = new Date(newSecondValue);

          let secondDiff = (actualExpt.getTime() - secondD.getTime()) / 1000;

          secondDiff /= 60 * 60;

          let actualNewSecondValue = Math.abs(Math.round(secondDiff));

          newTotal = actualNewFirstValue + actualNewSecondValue;

          total = newTotal;
        } else {
          // ignore sundays in hour calculations start container
          //

          let currentDate = new Date(actualDate);
          let nonWorkingHours = [0];

          while (currentDate <= actualExpt) {
            if (!nonWorkingHours.includes(currentDate.getDay())) {
              console.log("not sunday");
            } else {
              // currentDate.setDate(currentDate.getDate() + 1)
              // console.log("sunday");
              timerOfValue -= 24;
              //sundayCount += 1
            }
            currentDate.setDate(currentDate.getDate() + 1);
          }

          //
          // ignore sundays in hours calculations in end container

          let totalHourTwinty;
          let multipleOfElight;
          let divideByTwintyFour = Math.floor(timerOfValue / 24);

          if (divideByTwintyFour < 1) {
            multipleOfElight = 0;
          } else {
            multipleOfElight = divideByTwintyFour * 9;
          }

          let reminderOfTwintyFour = timerOfValue % 24;

          //
          //

          if (reminderOfTwintyFour <= 9) {
            totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
            total = totalHourTwinty;
          } else if (reminderOfTwintyFour > 9 && reminderOfTwintyFour < 24) {
            let previousDate1 = new Date(actualExpt);
            previousDate1.setDate(previousDate1.getDate() - 1);

            if (previousDate1.getDay() == 0) {
              previousDate1.setDate(previousDate1.getDate() - 1);
            }

            let preVTime = previousDate1.toString().slice(0, 15);

            let creatV = actualDate.toString().slice(15, 24);

            let oldValue = `${preVTime}${creatV}`;

            let oldValueNewDate = new Date(oldValue);

            let oldSecondValue = `${preVTime} 18:30:00`;

            let oldSecondNewDate = new Date(oldSecondValue);

            let secondDiffss =
              (oldValueNewDate.getTime() - oldSecondNewDate.getTime()) / 1000;

            secondDiffss /= 60 * 60;

            let actualNewSecondValuess = Math.abs(Math.round(secondDiffss));

            let morningTime = actualExpt.toString().slice(0, 15);

            let newSecondValue = `${morningTime} 9:30`;
            let secondD = new Date(newSecondValue);

            //let newValueDate = new Date();

            let secondDiff = (actualExpt.getTime() - secondD.getTime()) / 1000;

            secondDiff /= 60 * 60;

            let actualNewSecondValue = Math.abs(Math.round(secondDiff));
            totalHourTwinty =
              multipleOfElight +
              (actualNewSecondValue + actualNewSecondValuess);
            // console.log(actualNewSecondValue);
            total = totalHourTwinty;
          } else {
            totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
            total = totalHourTwinty;
          }

          // let totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
          //total = totalHourTwinty;
        }
      } else {
        // new added calculations

        let diff = (date2.getTime() - date1.getTime()) / 1000;
        diff /= 60 * 60;
        let timerOfValue = Math.abs(Math.round(diff));
        // console.log(`timerOfValue ${timerOfValue}`);
        if (timerOfValue < 9) {
          total = timerOfValue;
        } else if (timerOfValue >= 9 && timerOfValue < 24) {
          //console.log("24 below and 9 above");
          let newTotal;
          let firstNewDate = date1.toString().slice(0, 15);
          // let firstNewDate = (date1 + "").slice(0, 10);
          let newFirstValue = `${firstNewDate} 18:30:00`;
          let firstD = new Date(newFirstValue);

          // console.log(date1);
          // console.log(firstD);

          let firstDiff = (firstD.getTime() - date1.getTime()) / 1000;
          firstDiff /= 60 * 60;
          let actualNewFirstValue = Math.abs(Math.round(firstDiff));

          // console.log(actualNewFirstValue);

          // another second date calculations

          let secondNewDate = date2.toString().slice(0, 15);
          let newSecondValue = `${secondNewDate} 9:30`;
          let secondD = new Date(newSecondValue);

          let secondDiff = (date2.getTime() - secondD.getTime()) / 1000;

          secondDiff /= 60 * 60;

          let actualNewSecondValue = Math.abs(Math.round(secondDiff));

          newTotal = actualNewFirstValue + actualNewSecondValue;

          total = newTotal;
        } else {
          // ignore hours calculations start container
          //
          let currentDate = new Date(date1);
          let nonWorkingHours = [0];

          while (currentDate <= date2) {
            if (!nonWorkingHours.includes(currentDate.getDay())) {
              console.log("not sunday");
            } else {
              // currentDate.setDate(currentDate.getDate() + 1)
              // console.log("sunday");
              timerOfValue -= 24;
              //sundayCount += 1
            }
            currentDate.setDate(currentDate.getDate() + 1);
          }

          //
          // ignore hours calculations end container

          let totalHourTwinty;
          let multipleOfElight;
          let divideByTwintyFour = Math.floor(timerOfValue / 24);

          if (divideByTwintyFour < 1) {
            multipleOfElight = 0;
          } else {
            multipleOfElight = divideByTwintyFour * 9;
          }

          let reminderOfTwintyFour = timerOfValue % 24;

          if (reminderOfTwintyFour <= 9) {
            totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
            total = totalHourTwinty;
          } else if (reminderOfTwintyFour > 9 && reminderOfTwintyFour < 24) {
            let previousDate1 = new Date(date2);
            previousDate1.setDate(previousDate1.getDate() - 1);

            if (previousDate1.getDay() == 0) {
              previousDate1.setDate(previousDate1.getDate() - 1);
            }

            let preVTime = previousDate1.toString().slice(0, 15);

            let creatV = date1.toString().slice(15, 24);

            let oldValue = `${preVTime}${creatV}`;

            let oldValueNewDate = new Date(oldValue);

            let oldSecondValue = `${preVTime} 18:30:00`;

            let oldSecondNewDate = new Date(oldSecondValue);

            let secondDiffss =
              (oldValueNewDate.getTime() - oldSecondNewDate.getTime()) / 1000;

            secondDiffss /= 60 * 60;

            let actualNewSecondValuess = Math.abs(Math.round(secondDiffss));

            let morningTime = date2.toString().slice(0, 15);

            let newSecondValue = `${morningTime} 9:30`;
            let secondD = new Date(newSecondValue);

            //let newValueDate = new Date();

            let secondDiff = (date2.getTime() - secondD.getTime()) / 1000;

            secondDiff /= 60 * 60;

            let actualNewSecondValue = Math.abs(Math.round(secondDiff));
            totalHourTwinty =
              multipleOfElight +
              (actualNewSecondValue + actualNewSecondValuess);
            // console.log(actualNewSecondValue);
            total = totalHourTwinty;
          } else {
            totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
            total = totalHourTwinty;
          }

          // let totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
          //console.log(`24 above ${totalHourTwinty}`);
        }
      }

      // completed and running calculations
      //
      //
      //
      //
      //
      //

      if (date3) {
        if (actualDate) {
          //console.log("djkd");
          // let total;
          if (date3 >= actualDate) {
            //console.log("updated date big");
            //

            // added new calculations

            let rr;
            //  changes new dates
            let diff = (date3.getTime() - actualDate.getTime()) / 1000;
            diff /= 60 * 60;
            let timerOfValue = Math.abs(Math.round(diff));

            if (timerOfValue < 9) {
              rr = timerOfValue;
            } else if (timerOfValue >= 9 && timerOfValue < 24) {
              //console.log("24 below and 9 above");
              let newTotal;
              let firstNewDate = actualDate.toString().slice(0, 15);

              let newFirstValue = `${firstNewDate} 18:30:00`;
              let firstD = new Date(newFirstValue);

              // console.log(date1);
              // console.log(firstD);

              let firstDiff = (firstD.getTime() - actualDate.getTime()) / 1000;
              firstDiff /= 60 * 60;
              let actualNewFirstValue = Math.abs(Math.round(firstDiff));

              // console.log(actualNewFirstValue);

              // another second date calculations

              let secondNewDate = date3.toString().slice(0, 15);
              let newSecondValue = `${secondNewDate} 9:30`;
              let secondD = new Date(newSecondValue);

              let secondDiff = (date3.getTime() - secondD.getTime()) / 1000;

              secondDiff /= 60 * 60;

              let actualNewSecondValue = Math.abs(Math.round(secondDiff));

              newTotal = actualNewFirstValue + actualNewSecondValue;

              rr = newTotal;
            } else {
              // ignore sundays in hours calculations start container
              //

              let currentDate = new Date(actualDate);
              let nonWorkingHours = [0];

              while (currentDate <= date3) {
                if (!nonWorkingHours.includes(currentDate.getDay())) {
                  console.log("not sunday");
                } else {
                  // currentDate.setDate(currentDate.getDate() + 1)
                  // console.log("sunday");
                  timerOfValue -= 24;
                  //sundayCount += 1
                }
                currentDate.setDate(currentDate.getDate() + 1);
              }

              //
              // ignore sundays in hours calculations end container

              let totalHourTwinty;
              let multipleOfElight;
              let divideByTwintyFour = Math.floor(timerOfValue / 24);

              if (divideByTwintyFour < 1) {
                multipleOfElight = 0;
              } else {
                multipleOfElight = divideByTwintyFour * 9;
              }

              let reminderOfTwintyFour = timerOfValue % 24;

              //
              //
              //

              if (reminderOfTwintyFour <= 9) {
                totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
              } else if (
                reminderOfTwintyFour > 9 &&
                reminderOfTwintyFour < 24
              ) {
                let previousDate1 = new Date(date3);
                previousDate1.setDate(previousDate1.getDate() - 1);

                if (previousDate1.getDay() == 0) {
                  previousDate1.setDate(previousDate1.getDate() - 1);
                }

                let preVTime = previousDate1.toString().slice(0, 15);

                let creatV = actualDate.toString().slice(15, 24);

                let oldValue = `${preVTime}${creatV}`;

                let oldValueNewDate = new Date(oldValue);

                let oldSecondValue = `${preVTime} 18:30:00`;

                let oldSecondNewDate = new Date(oldSecondValue);

                let secondDiffss =
                  (oldValueNewDate.getTime() - oldSecondNewDate.getTime()) /
                  1000;

                secondDiffss /= 60 * 60;

                let actualNewSecondValuess = Math.abs(Math.round(secondDiffss));

                let morningTime = date3.toString().slice(0, 15);

                let newSecondValue = `${morningTime} 9:30`;
                let secondD = new Date(newSecondValue);

                //let newValueDate = new Date();

                let secondDiff = (date3.getTime() - secondD.getTime()) / 1000;

                secondDiff /= 60 * 60;

                let actualNewSecondValue = Math.abs(Math.round(secondDiff));
                totalHourTwinty =
                  multipleOfElight +
                  (actualNewSecondValue + actualNewSecondValuess);
                // console.log(actualNewSecondValue);
              } else {
                totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
              }

              //
              //
              //

              rr = totalHourTwinty;
            }

            setCompletedHour(rr);
            const values = {
              projectId: each.project_id,
              taskValue: each.id,
              timer: rr,
              totalHour: total,
              taskName: each.task,
              userName: each.username,
            };

            // const API = axios.create({
            //   baseURL: "https://server-bt-tasks.onrender.com",
            // });

            API.post("/time/value", values)
              .then((res) => {
                console.log(res.data);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        } else {
          if (date3 >= date1) {
            let rr;
            //  changes new dates
            let diff = (date3.getTime() - date1.getTime()) / 1000;
            diff /= 60 * 60;
            let timerOfValue = Math.abs(Math.round(diff));

            if (timerOfValue < 9) {
              rr = timerOfValue;
            } else if (timerOfValue >= 9 && timerOfValue < 24) {
              //console.log("24 below and 9 above");
              let newTotal;
              let firstNewDate = date1.toString().slice(0, 15);

              let newFirstValue = `${firstNewDate} 18:30:00`;
              let firstD = new Date(newFirstValue);

              // console.log(date1);
              // console.log(firstD);

              let firstDiff = (firstD.getTime() - date1.getTime()) / 1000;
              firstDiff /= 60 * 60;
              let actualNewFirstValue = Math.abs(Math.round(firstDiff));

              // console.log(actualNewFirstValue);

              // another second date calculations

              let secondNewDate = date3.toString().slice(0, 15);
              let newSecondValue = `${secondNewDate} 9:30`;
              let secondD = new Date(newSecondValue);

              let secondDiff = (date3.getTime() - secondD.getTime()) / 1000;

              secondDiff /= 60 * 60;

              let actualNewSecondValue = Math.abs(Math.round(secondDiff));

              newTotal = actualNewFirstValue + actualNewSecondValue;

              rr = newTotal;
            } else {
              // ignore sundays in hours calculations start container
              //

              let currentDate = new Date(date1);
              let nonWorkingHours = [0];

              while (currentDate <= date3) {
                if (!nonWorkingHours.includes(currentDate.getDay())) {
                  console.log("not sunday");
                } else {
                  // currentDate.setDate(currentDate.getDate() + 1)
                  // console.log("sunday");
                  timerOfValue -= 24;
                  //sundayCount += 1
                }
                currentDate.setDate(currentDate.getDate() + 1);
              }

              //
              // ignore sundays in hours calculations end container

              let totalHourTwinty;
              let multipleOfElight;
              let divideByTwintyFour = Math.floor(timerOfValue / 24);

              if (divideByTwintyFour < 1) {
                multipleOfElight = 0;
              } else {
                multipleOfElight = divideByTwintyFour * 9;
              }

              let reminderOfTwintyFour = timerOfValue % 24;

              //  new added remainder values start
              //
              //

              if (reminderOfTwintyFour <= 9) {
                totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
              } else if (
                reminderOfTwintyFour > 9 &&
                reminderOfTwintyFour < 24
              ) {
                let previousDate1 = new Date(date3);
                previousDate1.setDate(previousDate1.getDate() - 1);

                if (previousDate1.getDay() == 0) {
                  previousDate1.setDate(previousDate1.getDate() - 1);
                }

                let preVTime = previousDate1.toString().slice(0, 15);

                let creatV = date1.toString().slice(15, 24);

                let oldValue = `${preVTime}${creatV}`;

                let oldValueNewDate = new Date(oldValue);

                let oldSecondValue = `${preVTime} 18:30:00`;

                let oldSecondNewDate = new Date(oldSecondValue);

                let secondDiffss =
                  (oldValueNewDate.getTime() - oldSecondNewDate.getTime()) /
                  1000;

                secondDiffss /= 60 * 60;

                let actualNewSecondValuess = Math.abs(Math.round(secondDiffss));

                let morningTime = date3.toString().slice(0, 15);

                let newSecondValue = `${morningTime} 9:30`;
                let secondD = new Date(newSecondValue);

                //let newValueDate = new Date();

                let secondDiff = (date3.getTime() - secondD.getTime()) / 1000;

                secondDiff /= 60 * 60;

                let actualNewSecondValue = Math.abs(Math.round(secondDiff));
                totalHourTwinty =
                  multipleOfElight +
                  (actualNewSecondValue + actualNewSecondValuess);
                // console.log(actualNewSecondValue);
              } else {
                totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
              }

              //
              //
              //

              // totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
              rr = totalHourTwinty;
            }

            // const diffTime1 = Math.abs(date3 - date1);
            // const diffDays1 = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24));
            setCompletedHour(rr);
            // const rr = diffDays1 * 8;
            const values = {
              projectId: each.project_id,
              taskValue: each.id,
              timer: rr,
              totalHour: total,
              taskName: each.task,
              userName: each.username,
            };

            // const API = axios.create({
            //   baseURL: "https://server-bt-tasks.onrender.com",
            // });

            API.post("/time/value", values)
              .then((res) => {
                console.log(res.data);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }
      } else {
        const datess = new Date();

        if (actualDate) {
          if (datess >= actualDate) {
            // const diffTime = Math.abs(datess - actualDate);
            // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            // setTimerHour(diffDays * 8);

            // new added calculationss==============

            let rr;
            //  changes new dates
            let diff = (datess.getTime() - actualDate.getTime()) / 1000;
            diff /= 60 * 60;
            let timerOfValue = Math.abs(Math.round(diff));

            if (timerOfValue < 9) {
              rr = `R-${timerOfValue}`;
            } else if (timerOfValue >= 9 && timerOfValue < 24) {
              //console.log("24 below and 9 above");
              let newTotal;
              let firstNewDate = actualDate.toString().slice(0, 15);
              // let firstNewDate = (date1 + "").slice(0, 10);
              let newFirstValue = `${firstNewDate} 18:30:00`;
              let firstD = new Date(newFirstValue);

              // console.log(date1);
              // console.log(firstD);

              let firstDiff = (firstD.getTime() - actualDate.getTime()) / 1000;
              firstDiff /= 60 * 60;
              let actualNewFirstValue = Math.abs(Math.round(firstDiff));

              // console.log(actualNewFirstValue);

              // another second date calculations

              let secondNewDate = datess.toString().slice(0, 15);
              let newSecondValue = `${secondNewDate} 9:30`;
              let secondD = new Date(newSecondValue);

              let secondDiff = (datess.getTime() - secondD.getTime()) / 1000;

              secondDiff /= 60 * 60;

              let actualNewSecondValue = Math.abs(Math.round(secondDiff));

              newTotal = actualNewFirstValue + actualNewSecondValue;

              rr = `R-${newTotal}`;
            } else {
              // ignore sundays in hour calculations start container
              //

              let currentDate = new Date(actualDate);
              let nonWorkingHours = [0];

              while (currentDate <= datess) {
                if (!nonWorkingHours.includes(currentDate.getDay())) {
                  console.log("not sunday");
                } else {
                  // currentDate.setDate(currentDate.getDate() + 1)
                  // console.log("sunday");
                  timerOfValue -= 24;
                  //sundayCount += 1
                }
                currentDate.setDate(currentDate.getDate() + 1);
              }

              //
              // ignore sundays in hour calculations end container
              let totalHourTwinty;
              let multipleOfElight;
              let divideByTwintyFour = Math.floor(timerOfValue / 24);

              if (divideByTwintyFour < 1) {
                multipleOfElight = 0;
              } else {
                multipleOfElight = divideByTwintyFour * 9;
              }

              let reminderOfTwintyFour = timerOfValue % 24;

              if (reminderOfTwintyFour <= 9) {
                totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
              } else if (
                reminderOfTwintyFour > 9 &&
                reminderOfTwintyFour < 24
              ) {
                let previousDate1 = new Date(datess);
                previousDate1.setDate(previousDate1.getDate() - 1);

                if (previousDate1.getDay() == 0) {
                  previousDate1.setDate(previousDate1.getDate() - 1);
                }

                let preVTime = previousDate1.toString().slice(0, 15);

                let creatV = actualDate.toString().slice(15, 24);

                console.log(preVTime);

                console.log(creatV);

                let oldValue = `${preVTime}${creatV}`;

                let oldValueNewDate = new Date(oldValue);

                let oldSecondValue = `${preVTime} 18:30:00`;

                let oldSecondNewDate = new Date(oldSecondValue);

                let secondDiffss =
                  (oldValueNewDate.getTime() - oldSecondNewDate.getTime()) /
                  1000;

                secondDiffss /= 60 * 60;

                let actualNewSecondValuess = Math.abs(Math.round(secondDiffss));

                // console.log(oldValueNewDate);

                // console.log(oldSecondValue);

                // console.log(actualNewSecondValuess);

                let morningTime = datess.toString().slice(0, 15);

                let newSecondValue = `${morningTime} 9:30`;
                let secondD = new Date(newSecondValue);
                // console.log(secondD);

                //let newValueDate = new Date();

                let secondDiff = (datess.getTime() - secondD.getTime()) / 1000;

                secondDiff /= 60 * 60;

                let actualNewSecondValue = Math.abs(Math.round(secondDiff));
                totalHourTwinty =
                  multipleOfElight +
                  (actualNewSecondValue + actualNewSecondValuess);
                // console.log(actualNewSecondValue);
              } else {
                totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
              }
              rr = `R-${totalHourTwinty}`;
            }

            // const rr = `R-${diffDays * 8}`;
            setCompletedHour(rr);
            const values = {
              projectId: each.project_id,
              taskValue: each.id,
              timer: rr,
              totalHour: total,
              taskName: each.task,
              userName: each.username,
            };

            // const API = axios.create({
            //   baseURL: "https://server-bt-tasks.onrender.com",
            // });

            API.post("/time/value", values)
              .then((res) => {
                console.log(res.data);
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            const values = {
              taskValue: each.id,
              timer: "R-0",
              totalHour: total,
              taskName: each.task,
              userName: each.username,
            };

            // const API = axios.create({
            //   baseURL: "https://server-bt-tasks.onrender.com",
            // });

            API.post("/time/value", values)
              .then((res) => {
                console.log(res.data);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        } else {
          if (datess >= date1) {
            // const diffTime = Math.abs(datess - date1);
            // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            // setTimerHour(diffDays * 8);

            // new added hours

            //console.log(datess);
            //console.log(date1);

            let rr;
            //  changes new dates
            let diff = (datess.getTime() - date1.getTime()) / 1000;
            diff /= 60 * 60;
            let timerOfValue = Math.abs(Math.round(diff));

            // console.log(timerOfValue);

            if (timerOfValue < 9) {
              rr = `R-${timerOfValue}`;
            } else if (timerOfValue >= 9 && timerOfValue < 24) {
              //console.log("24 below and 9 above");
              let newTotal;
              let firstNewDate = date1.toString().slice(0, 15);
              // let firstNewDate = (date1 + "").slice(0, 10);
              let newFirstValue = `${firstNewDate} 18:30:00`;
              let firstD = new Date(newFirstValue);

              //console.log(firstNewDate);
              //console.log(firstD);

              let firstDiff = (firstD.getTime() - date1.getTime()) / 1000;
              firstDiff /= 60 * 60;
              let actualNewFirstValue = Math.abs(Math.round(firstDiff));

              //console.log(actualNewFirstValue);

              // another second date calculations

              let secondNewDate = datess.toString().slice(0, 15);
              let newSecondValue = `${secondNewDate} 9:30`;
              let secondD = new Date(newSecondValue);

              //console.log(secondNewDate);
              //console.log(secondD);

              let secondDiff = (datess.getTime() - secondD.getTime()) / 1000;

              secondDiff /= 60 * 60;

              let actualNewSecondValue = Math.abs(Math.round(secondDiff));

              //console.log(actualNewSecondValue);

              newTotal = actualNewFirstValue + actualNewSecondValue;

              rr = `R-${newTotal}`;
            } else {
              // ignore sundays in hour calculations start container
              //
              let currentDate = new Date(date1);
              let nonWorkingHours = [0];

              while (currentDate <= datess) {
                if (!nonWorkingHours.includes(currentDate.getDay())) {
                  console.log("not sunday");
                } else {
                  // currentDate.setDate(currentDate.getDate() + 1)
                  // console.log("sunday");
                  timerOfValue -= 24;
                  //sundayCount += 1
                }
                currentDate.setDate(currentDate.getDate() + 1);
              }

              //
              // ignore sundays in hour calculations end container

              let totalHourTwinty;
              let multipleOfElight;
              let divideByTwintyFour = Math.floor(timerOfValue / 24);

              if (divideByTwintyFour < 1) {
                multipleOfElight = 0;
              } else {
                multipleOfElight = divideByTwintyFour * 9;
              }

              let reminderOfTwintyFour = timerOfValue % 24;

              // reminder is less than 9
              if (reminderOfTwintyFour <= 9) {
                totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
              } else if (
                reminderOfTwintyFour > 9 &&
                reminderOfTwintyFour < 24
              ) {
                let previousDate1 = new Date(datess);
                previousDate1.setDate(previousDate1.getDate() - 1);

                if (previousDate1.getDay() == 0) {
                  previousDate1.setDate(previousDate1.getDate() - 1);
                }

                let preVTime = previousDate1.toString().slice(0, 15);

                let creatV = date1.toString().slice(15, 24);

                // console.log(preVTime);

                // console.log(creatV);

                let oldValue = `${preVTime}${creatV}`;

                let oldValueNewDate = new Date(oldValue);

                let oldSecondValue = `${preVTime} 18:30:00`;

                let oldSecondNewDate = new Date(oldSecondValue);

                let secondDiffss =
                  (oldValueNewDate.getTime() - oldSecondNewDate.getTime()) /
                  1000;

                secondDiffss /= 60 * 60;

                let actualNewSecondValuess = Math.abs(Math.round(secondDiffss));

                // console.log(oldValueNewDate);

                // console.log(oldSecondValue);

                // console.log(actualNewSecondValuess);

                let morningTime = datess.toString().slice(0, 15);

                let newSecondValue = `${morningTime} 9:30`;
                let secondD = new Date(newSecondValue);
                // console.log(secondD);

                //let newValueDate = new Date();

                let secondDiff = (datess.getTime() - secondD.getTime()) / 1000;

                secondDiff /= 60 * 60;

                let actualNewSecondValue = Math.abs(Math.round(secondDiff));
                totalHourTwinty =
                  multipleOfElight +
                  (actualNewSecondValue + actualNewSecondValuess);
                // console.log(actualNewSecondValue);
              } else {
                totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
              }
              //console.log(reminderOfTwintyFour);

              //console.log(`total ${totalHourTwinty}`);
              rr = `R-${totalHourTwinty}`;
            }

            setCompletedHour(rr);
            // const rr = `R-${diffDays * 8}`;
            const values = {
              projectId: each.project_id,
              taskValue: each.id,
              timer: rr,
              totalHour: total,
              taskName: each.task,
              userName: each.username,
            };

            // const API = axios.create({
            //   baseURL: "https://server-bt-tasks.onrender.com",
            // });

            API.post("/time/value", values)
              .then((res) => {
                console.log(res.data);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }
      }
    });
  }, [userDataTask]);

  const fetchTheTimersBasedOnTask = (id) => {
    // console.log(id);
    // const API = axios.create({
    //   baseURL: "https://server-bt-tasks.onrender.com",
    // });

    API.get(`/time/taskvalue/${id}`)
      .then((res) => {
        // console.log(res.data);
        // const arrayOfObject = res.data[0];
        // const array = Array(arrayOfObject);
        //
        //console.log(array);
        setUserTaskTimer(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const profileEditModal = () => {
    setEditProfileModal(true);
  };

  return (
    <div className="new-user-component">
      <div className="new-header-user">
        <Header changeDarkMode={changeDarkMode} darkMode={darkMode} />
      </div>
      {/* <button onClick={bt}>btn</button> */}
      <div className="user-name-container">
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

        {/* hours cal container end */}

        <Chart options={options} series={update} type="donut" width="300" />
      </div>
      <div className="search-edit-profile-container">
        <div>
          <RiEdit2Line
            onClick={profileEditModal}
            className="profile-edit-image"
            style={{
              color: darkMode ? "#ffffff" : "",
            }}
          />
        </div>
        <div>
          {userTasKTimer.length !== 0 && (
            <div
              className="new-employee-cont"
              style={{
                // background: darkMode ? "#7d7d7d" : "",
                border: darkMode ? "1px solid #ffffff" : "",
                color: darkMode ? "#ffffff" : "",
              }}
            >
              {userTasKTimer.map((each, index) => (
                <div key={index}>
                  <p className="para-total-hour">
                    Total Hours :{" "}
                    <span
                      className="total-span fff"
                      style={{
                        // background: darkMode ? "#7d7d7d" : "",
                        color: darkMode ? "rgb(181, 33, 52)" : "",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      {each.totalHour}
                    </span>
                  </p>
                  {each.timer.split("-")[0] === "R" ? (
                    <p className="para-total-hour">
                      Running Hour :{" "}
                      <span
                        className="total-span fff"
                        style={{
                          // background: darkMode ? "#7d7d7d" : "",
                          color: darkMode ? "#e3d059" : "",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        {each.timer.split("-")[1]}
                      </span>
                    </p>
                  ) : (
                    <p className="para-total-hour">
                      Completed Hours :{" "}
                      <span
                        className="total-span fff"
                        style={{
                          // background: darkMode ? "#7d7d7d" : "",
                          color: darkMode ? "#1a8a1a" : "",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        {each.timer}
                      </span>{" "}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="employee-serach-container">
          <div
            style={{
              borderColor: darkMode ? "#ffffff" : "",
            }}
          >
            <input
              type="text"
              placeholder="search based on status"
              onChange={searchInput}
              className="change"
              style={{
                color: darkMode ? "#ffffff" : "",
              }}
            />
            <div>
              <BiSearchAlt
                className="employee-seacrh-icon"
                style={{
                  color: darkMode ? "#ffffff" : "",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {valuesFilter.length !== 0 && (
        <table className="content-table">
          <thead>
            <tr>
              <th>ProjectId</th>
              <th>Task</th>
              <th>CreateDate</th>
              <th>UpdateDate</th>
              <th>ExpertDate</th>
              <th>ActualComDate</th>
              <th>ActualExptDate</th>
              <th>Status</th>
              <th>Details & Edit</th>
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
                onClick={() => fetchTheTimersBasedOnTask(each?.id)}
              >
                <td>{each.project_id}</td>
                <td>{each.task}</td>
                <td>{each.createdate}</td>
                {/* <td>{each.updatedAt.slice(0, 10)}</td> */}
                <td>{each.updatedDate}</td>
                <td>{each.date}</td>
                <td>{each.actualComDate}</td>
                <td>{each.actualExptDate}</td>
                <td>
                  <div
                    style={{
                      backgroundColor:
                        each.status === "completed"
                          ? "#0a5c0d"
                          : each.status === "In-completed"
                          ? "#b52134"
                          : "#a8ad09",
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
                <td>
                  <BiDetail
                    id={each?.id}
                    onClick={() => detailsAndModel(each)}
                    style={{ cursor: "pointer" }}
                  />
                  <button
                    id={each?.id}
                    onClick={() => editAndModel(each)}
                    disabled={each.status === "completed"}
                    style={{
                      background: "transparent",
                      border: "none",
                      width: "fit-content",

                      color: darkMode ? "#ffffff" : "",
                    }}
                  >
                    <FiEdit
                      // disabled={true}
                      style={{ marginLeft: "50px", cursor: "pointer" }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <UserModal
        modal={modal}
        setModal={setModal}
        datilsTask={description}
        taskDescId={taskDescId}
        getUserTask={getUserTask}
      />
      {/* task details modal end */}
      {/* task change status modal start */}
      {editModal && (
        <UserEditModal
          editModal={editModal}
          setEditModal={setEditModal}
          editUserTask={editUserTask?.id}
          getUserTask={getUserTask}
        />
      )}
      {/* task change status modal end */}

      {/* profile Edit Modal start container */}
      <ProfileEditModal
        editProfileModal={editProfileModal}
        setEditProfileModal={setEditProfileModal}
      />
    </div>
  );
};

export default Users;
