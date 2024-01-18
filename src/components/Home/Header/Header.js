import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import logo from "../../../assets/logo.png";
import logoLight from "../../../assets/logolight.png";
import Image from "../../designLayouts/Image";
import { navBarList } from "../../../constants";
import Flex from "../../designLayouts/Flex";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../redux/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const location = useLocation();
  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [value, setValue] = useState();

  //logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-20 bg-slate-950 sticky top-0 z-50 border-b-[2px] shadow-2xl border-b-gray-200">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/">
            <div>
              <Image className="w-20 object-cover" imgSrc={logo} />
            </div>
          </Link>
          <Link to="/">
          <div className="text-slate-200 font-semibold hover:text-amber-500"> Cook With Me👩🏻‍🍳</div>
          </Link>
          <div>
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center w-auto z-50 p-0 gap-2"
              >
                {!isLogin && (
                  <>
                    {navBarList.map(({ _id, title, link }) => (
                      <NavLink
                        key={_id}
                        className="flex w-20 h-6 justify-center items-center px-12 text-base text-gray-100 font-semibold underline-offset-[4px] decoration-[1px] hover:text-red-600 hover:text-lg hoverEffect last:border-r-0"
                        to={link}
                        state={{ data: location.pathname.split("/")[1] }}
                      >
                        <li>{title}</li>
                      </NavLink>
                    ))}
                  </>
                )}
                {isLogin && (
                  <div className=" text-white font-semibold ">
                    <Tabs
                      textColor="warning"
                      fontFamily=" 'Josefin Sans', sans-serif"
                      value={value}
                      onChange={(e, val) => setValue(val)}
                    >
                      <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                      <Tab
                        label="My Blogs"
                        LinkComponent={Link}
                        to="/my-blogs"
                      />
                      <Tab
                        label="Create Blog"
                        LinkComponent={Link}
                        to="/create-blog"
                      />
                    </Tabs>
                  </div>
                )}
                {isLogin && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 m-4 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  >
                    Logout
                  </button>
                )}
              </motion.ul>
            )}
            <HiMenuAlt2
              onClick={() => setSidenav(!sidenav)}
              className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4 text-slate-200"
            />
            {sidenav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[80%] h-full relative"
                >
                  <div className="w-full h-full bg-primeColor p-6">
                    <img
                      className="w-28 mb-6"
                      src={logoLight}
                      alt="logoLight"
                    />
                    <ul className="text-gray-200 flex flex-col gap-2">
                      {!isLogin && (
                        <>
                          {navBarList.map(({ _id, title, link }) => (
                            <NavLink
                              key={_id}
                              className="flex w-20 h-6 justify-center items-center px-12 text-base text-gray-100 font-semibold underline-offset-[4px] decoration-[1px] hover:text-red-600 hover:text-lg hoverEffect last:border-r-0"
                              to={link}
                              state={{ data: location.pathname.split("/")[1] }}
                            >
                              <li>{title}</li>
                            </NavLink>
                          ))}
                        </>
                      )}
                      {isLogin && (
                        <div className="flex text-white font-semibold ">
                          <Tabs
                            textColor="warning"
                            value={value}
                            onChange={(e, val) => setValue(val)}
                          >
                            <Tab
                              label="Blogs"
                              LinkComponent={Link}
                              to="/blogs"
                            />
                            <Tab
                              label="My Blogs"
                              LinkComponent={Link}
                              to="/my-blogs"
                            />
                            <Tab
                              label="Create Blog"
                              LinkComponent={Link}
                              to="/create-blog"
                            />
                          </Tabs>
                        </div>
                      )}
                      {isLogin && (
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        >
                          Logout
                        </button>
                      )}
                    </ul>
                  </div>
                  <span
                    onClick={() => setSidenav(false)}
                    className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                  >
                    <MdClose />
                  </span>
                </motion.div>
              </div>
            )}
          </div>
        </Flex>
      </nav>
    </div>
  );
};

export default Header;

