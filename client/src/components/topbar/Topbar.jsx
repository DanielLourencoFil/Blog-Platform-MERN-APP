import "./topbar.css";
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import userImage from "../../assets/user-img-1.png";
import SocialIcons from "../common/socialIcons/SocialIcons";

function Topbar() {
	const user = false;
	const [isActive, setIsActive] = useState("");
	const navigate = useNavigate();
	const userId = "daniel";

	const handleLink = (link, e) => {
		setIsActive(link);
		navigate("/");
		console.log(e.currentTarget);
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
							to={`/write/${userId}`}
							className={`navlink ${isActive === "write" ? "active" : ""}`}
							onClick={() => handleLink("write")}
						>
							<li className="top-list-item">WRITE</li>
						</Link>
						{user && (
							<Link
								to="/"
								className={`navlink ${isActive === "logout" ? "active" : ""}`}
								onClick={() => handleLink("logout")}
							>
								<li className="top-list-item">LOGOUT</li>
							</Link>
						)}
					</ul>
				</div>
				<div className="top-rigth">
					{user ? (
						<Link to={`/user/update/${userId}`}>
							<img src={userImage} alt="user" className="user-img" />
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
