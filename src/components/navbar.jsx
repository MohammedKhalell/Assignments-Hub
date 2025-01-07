
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slics/authSlice";
import styles from "./nav.module.css";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import LogoutModal from './LogoutModal';

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const publicRoutes = [
    { path: "/", name: "Home" },
    { path: "/Form", name: "Form" },
    { path: "/E-commerce", name: "E-commerce" },
  ];

  const privateRoutes = [
    { path: "/ChatApp", name: "Chat App" },
    { path: "/task-management", name: "Task Manager" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    setShowLogoutModal(false);
  };

  return (









    <>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {publicRoutes.map((route) => (
            <li key={route.path}>
              <Link className={styles.navLink} to={route.path}>
                {route.name}
              </Link>
            </li>
          ))}








          {user ? (
            <>
              {privateRoutes.map((route) => (
                <li key={route.path}>
                  <Link className={styles.navLink} to={route.path}>
                    {route.name}
                  </Link>
                </li>
              ))}
              <li className={styles.userSection}>
                <span className={styles.username}>
                  <FaUser /> {user.name}
                </span>
                <button
                  className={styles.logoutBtn}
                  onClick={() => setShowLogoutModal(true)}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>











            </>
          ) : (
            <li>
              <Link className={styles.loginBtn} to="/login">
                Login / Signup
              </Link>{" "}
            </li>










          )}
        </ul>
      </nav>

      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

export default Navbar;
