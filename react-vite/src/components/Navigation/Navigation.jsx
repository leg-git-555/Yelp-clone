import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const user = useSelector(state => state.session.user)

  return (
    <div className="header">
      <div>
        <NavLink to="/">Home</NavLink>
      </div>

      <div className="header-profile">
        {user && <NavLink to="/businesses/new">create new business</NavLink>}
        {user && <NavLink to="/businesses/current">manage your businesses</NavLink>}
        <div>
          <ProfileButton/>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
