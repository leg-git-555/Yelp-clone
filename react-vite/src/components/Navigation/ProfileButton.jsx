import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogin, thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate('/')
  };

  const loginDemo = async (e) => {
    e.preventDefault();
    await dispatch(thunkLogin({
      "email": "tony@aa.io",
      "password": "password"
    }))

    closeMenu()
  }

  return (
    <>
      <button onClick={toggleMenu} id='profile-button'>
        <FaUserCircle />
      </button>
      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <div>
              <div>{user.username}</div>
              <div>{user.email}</div>
              <div>
                <button onClick={logout}>Log Out</button>
              </div>
            </div>
          ) : (
            <div className="login-signup">
              <div id="login">
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
              <div id="signup">
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
              <div id="demo-user" onClick={(e) => loginDemo(e)}>
                Try Demo User
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
