import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const user = useSelector(state => state.session.user)
  const navigate = useNavigate()

  return (
    <div className="header">
      <div className="logo-container" onClick={() => {navigate('/') }}>
        <h1>Yelpoli</h1>
        <img src="https://aa-image-bucket.s3.us-east-2.amazonaws.com/yelp-logo-267.png"></img>
      </div>

      <div className="header-profile">
        <div>
          {user && <NavLink to="/businesses/new">create new business</NavLink>}
        </div>
        <div>
          {user && <NavLink to="/businesses/current">manage your businesses</NavLink>}
        </div>
        <div>
          {user && <img className="profile-pic" src={user.profile_image_url} />}
        </div>
        <div>
          <ProfileButton />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
