import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const user = useSelector(state => state.session.user)

  return (
    <div>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>

      <div>
        <ProfileButton />
      </div>
      {user && <div>{`${user.first_name} is logged in`}</div>}
    </div>
  );
}

export default Navigation;
