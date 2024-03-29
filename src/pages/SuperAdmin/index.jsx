import React, { useEffect, useState } from "react";

import { BiSearchAlt } from "react-icons/bi";
import { FiMoon } from "react-icons/fi";
// import { CiSettings } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./index.css";
import SuperAdminAddedAdminModal from "../SuperAdminAddedAdminModal";
import { useSelector } from "react-redux";
import axios from "axios";
import Header from "../Header";
import AdminDeleteTeamsModal from "../AdminDeleteTeamsModal";
import { API } from "../../data/apicall";

const SuperAdmin = ({ changeDarkMode, darkMode }) => {
  const [superAdminModal, setSuperAdminModal] = useState(false);

  const [allAdmindata, setAllAdmindata] = useState([]);

  const [deletedTeams, setDeletedTeams] = useState([]);
  const [adminDeleteModal, setAdminDeleteModal] = useState(false);

  const UUU = useSelector((state) => state.authReducer.authData);

  //console.log(UUU?._id);

  const superAdminAddedAdmin = (e) => {
    e.preventDefault();

    setSuperAdminModal(true);
  };

  const getAllTeamsByAdmin = () => {
    // const API = axios.create({
    //   baseURL: "http:localhost:5001",
    // });

    API.get(`team/admin/team/${UUU[0]?.id}`)
      .then((res) => {
        setAllAdmindata(res.data);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  const deletedAdminToTeamLeadr = (event) => {
    const desc = allAdmindata.filter(
      (each) => each._id === event.currentTarget.id
    );
    console.log(desc);
    setDeletedTeams(desc[0]);
    setAdminDeleteModal(true);
  };

  useEffect(() => {
    getAllTeamsByAdmin();
  }, []);

  console.log(allAdmindata);

  return (
    <>
      <div className="super-admin">
        <div className="new-header-user">
          <Header changeDarkMode={changeDarkMode} darkMode={darkMode} />
        </div>
        <div className="super-admin-second-page">
          <div className="btndiv">
            {/* <div className="super-admin-img-container">
              <img
                className="super-admin-img"
                src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"
              />
              <div>
                <h3>Super admin</h3>
                <p>All admin head</p>
              </div>
            </div> */}
            <div
              style={{
                display: "flex",

                gap: "1rem",
                width: "390px",
                // justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                className="admin-image"
                src={UUU.profilePic} //"https://i.pinimg.com/736x/52/29/5f/52295fa7746c2d69256c25a88b6343f4.jpg"
                alt="super"
              />
              <div>
                {/* {i.name.charAt(0).toUpperCase() + i.name.slice(1)} */}
                <h2 className="admin-heading">{UUU.name}</h2>
                <p className="admin-desc">{UUU.designation}</p>
              </div>
            </div>
            <button onClick={superAdminAddedAdmin} className="spabutton">
              create Admin
            </button>
          </div>
          <div className="admin-employee-f-container">
            {allAdmindata.map((each, index) => (
              <div key={index} className="admin-employess-s-container">
                <img
                  className="admin-employee-images-card"
                  src={each.profilepic}
                  alt=""
                />
                <div className="admin-team-delete">
                  <RiDeleteBin5Line
                    // id={each._id}
                    onClick={deletedAdminToTeamLeadr}
                  />
                </div>
                <p className="para-name">
                  {each.name.charAt(0).toUpperCase() + each.name.slice(1)}
                </p>
                <p className="admin-emp-role">
                  <span>{each.role}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SuperAdminAddedAdminModal
        superAdminModal={superAdminModal}
        setSuperAdminModal={setSuperAdminModal}
        getAllTeamsByAdmin={getAllTeamsByAdmin}
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

export default SuperAdmin;
