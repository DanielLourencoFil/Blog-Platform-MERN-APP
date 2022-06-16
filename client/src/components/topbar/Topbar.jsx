import "./topbar.css";
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import userImage from "../../assets/user-img-1.png";
import SocialIcons from "../common/socialIcons/SocialIcons";
import { useUserContext } from "../../context/UserContext";

function Topbar() {
	const { user, dispatch } = useUserContext();
	const [userCurrent, setUserCurrent] = useState(user || {});
	const [isActive, setIsActive] = useState("");
	const navigate = useNavigate();
	const { _id, profilePic } = userCurrent;

	const handleLink = (link, e) => {
		setIsActive(link);
		navigate("/");
		console.log(e.currentTarget);
	};
	const handleLogout = () => {
		dispatch({ type: "USER_STARTING" });
	};

	console.log(isActive);
	return (
		<div className="topbar">
			<div className="section-center topbar-center">
				<SocialIcons />
				<div className="top-center">
					<ul className="top-list">
						<Link
							to="/"
							className={`navlink ${isActive === "home" ? "active" : ""}`}
							onClick={() => handleLink("home")}
						>
							<li className="top-list-item">HOME</li>
						</Link>
						<a
							href="#about"
							className={`navlink ${isActive === "about" ? "active" : ""}`}
							onClick={() => handleLink("about")}
						>
							<li className="top-list-item">ABOUT</li>
						</a>
						<a
							href="#contact"
							className={`navlink ${isActive === "contact" ? "active" : ""}`}
							onClick={(e) => handleLink("contact", e)}
						>
							<li className="top-list-item">CONTACT</li>
						</a>
						<Link
							to={`/write/${_id}`}
							className={`navlink ${isActive === "write" ? "active" : ""}`}
							onClick={() => handleLink("write")}
						>
							<li className="top-list-item">WRITE</li>
						</Link>
						{user && (
							<Link
								to="/"
								className={`navlink ${isActive === "logout" ? "active" : ""}`}
								onClick={() => handleLogout()}
							>
								<li className="top-list-item">LOGOUT</li>
							</Link>
						)}
					</ul>
				</div>
				<div className="top-rigth">
					{user ? (
						<Link to={`/user/settings/${_id}`}>
							{profilePic ? (
								<img src={profilePic} alt="" className="user-img" />
							) : (
								<p className="my-settings">My Settings</p>
							)}
						</Link>
					) : (
						<>
							<Link
								to="/register"
								className={`navlink ${isActive === "register" ? "active" : ""}`}
								onClick={() => handleLink("register")}
							>
								<li className="top-list-item">Register</li>
							</Link>
							<Link
								to="/login"
								className={`navlink ${isActive === "login" ? "active" : ""}`}
								onClick={() => handleLink("login")}
							>
								<li className="top-list-item">Login</li>
							</Link>
						</>
					)}

					<div className="search-wrapper">
						{/* <input type="text" className="search-input active" /> */}
						<FaSearch className="social-icon search-icon" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Topbar;
