import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { useLocation } from "react-router-dom";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/teams",
    name: "Teams",
    icon: <MdMessage />,
  },
  {
    path: "/employee",
    name: "employee",
    icon: <FaUser />,
  },

  // {
  //   path: "/analytics",
  //   name: "Analytics",
  //   icon: <BiAnalyse />,
  // },
  // {
  //   path: "/file-manager",
  //   name: "File Manager",
  //   icon: <AiTwotoneFileExclamation />,
  //   subRoutes: [
  //     {
  //       path: "/settings/profile",
  //       name: "Profile ",
  //       icon: <FaUser />,
  //     },
  //     {
  //       path: "/settings/2fa",
  //       name: "2FA",
  //       icon: <FaLock />,
  //     },
  //     {
  //       path: "/settings/billing",
  //       name: "Billing",
  //       icon: <FaMoneyBill />,
  //     },
  //   ],
  // },
  // {
  //   path: "/order",
  //   name: "Order",
  //   icon: <BsCartCheck />,
  // },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/saved",
    name: "Saved",
    icon: <AiFillHeart />,
  },
];

const SideBar = ({ children, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [colorChange, setColorChange] = useState(false);

  const [color, setColor] = useColor("hex", "#00073D");
  console.log(color);

  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const location = useLocation();
  console.log(location.pathname);

  const pathValue = location.pathname;

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const changeColorPicker = (e) => {
    setColorChange(!colorChange);
  };

  console.log(colorChange);

  return (
    <>
      <div className="main-container">
        {pathValue !== "/login" && pathValue !== "/resetpassword" && (
          <motion.div
            animate={{
              width: isOpen ? "200px" : "45px",

              transition: {
                duration: 0.5,
                type: "spring",
                damping: 10,
              },
            }}
            style={{
              background: darkMode
                ? `${color.hex}` !== "#00073D"
                  ? `${color.hex}`
                  : "rgb(26, 27, 30)"
                : `${color.hex}`,
            }}
            className={`sidebar `}
          >
            <div className="top_section">
              <AnimatePresence>
                {isOpen && (
                  <motion.h1
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="logo"
                  >
                    Welcome
                  </motion.h1>
                )}
              </AnimatePresence>

              <div className="bars">
                <FaBars onClick={toggle} />
              </div>
            </div>

            <section className="routes">
              {routes.map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      setIsOpen={setIsOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                    />
                  );
                }

                return (
                  <NavLink
                    to={route.path}
                    key={index}
                    className="link"
                    activeClassName="active"
                  >
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                );
              })}
            </section>
            <div
              className="color-choose-container"
              style={{
                marginTop: "100px",
                marginLeft: isOpen ? "10px" : "",
              }}
            >
              <button
                type="button"
                className="color-pick-btn"
                onClick={changeColorPicker}
                style={{
                  width: isOpen ? "130px" : "45px",
                  fontSize: isOpen ? "16px" : "10px",
                }}
              >
                Choose Color
              </button>
              {colorChange && (
                <ColorPicker
                  width={400}
                  height={200}
                  color={color}
                  onChange={setColor}
                  // hideHSV
                  hideHEX="false"
                  hideRGB="false"
                  hideHSV="false"
                  // dark
                />
              )}
            </div>
          </motion.div>
        )}
        <main
          className="all-children"
          style={{
            background: darkMode ? "rgb(26, 27, 30)" : "",
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default SideBar;
