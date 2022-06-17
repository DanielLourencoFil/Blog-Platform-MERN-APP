import "./topbar.css";
import { useState, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import { useUserContext } from "../../context/UserContext";
import { useEffect } from "react";

function Topbar() {
	const { user, dispatch } = useUserContext();
	const searchRef = useRef();
	const navigate = useNavigate();
	const [userCurrent, setUserCurrent] = useState(user || {});
	const [search, setSearch] = useState("");
	const [isActive, setIsActive] = useState("");
	const { _id, profilePic } = userCurrent;

	useEffect(() => {
		const event = window.addEventListener("click", (e) => {
			console.log(e.target);
			console.log(searchRef.current.contains(e.target));
			if (!searchRef.current.contains(e.target)) {
				setSearch("");
			}
		});
		return () => window.removeEventListener("click", event);
	}, []);

	const handleLink = (link, e) => {
		setIsActive(link);
		navigate("/");
	};
	const handleLogout = () => {
		dispatch({ type: "USER_STARTING" });
	};
	const handleSearch = (e) => {
		e.preventDefault();
		console.log(search);
		setSearch("");
	};
	return (
		<div className="topbar">
			<div className="section-center topbar-center">
				<div className="top-center ">
					<ul className="top-list">
						<Link
							to="/"
							className={`navlink ${isActive === "home" ? "active" : ""}`}
							onClick={() => handleLink("home")}
						>
							<li className="top-list-item">HOME</li>
						</Link>
						{user && (
							<>
								<Link
									to={`/write/${_id}`}
									className={`navlink ${isActive === "write" ? "active" : ""}`}
									onClick={() => handleLink("write")}
								>
									<li className="top-list-item">WRITE</li>
								</Link>
							</>
						)}
					</ul>
				</div>
				{/* SEARCH INPUT */}
				<form className="search-wrapper" ref={searchRef}>
					<input
						type="text"
						className="search-input"
						onChange={(e) => setSearch(e.target.value)}
						value={search}
					/>
					<FaSearch
						className="social-icon search-icon"
						onClick={handleSearch}
					/>
				</form>
				<div className="top-rigth mobile">
					{user ? (
						<>
							<Link to={`/user/settings/${_id}`}>
								{profilePic ? (
									<img src={profilePic} alt="" className="user-img" />
								) : (
									<p className="my-settings">My Settings</p>
								)}
							</Link>
							<Link
								to="/"
								className={`navlink ${isActive === "logout" ? "active" : ""}`}
								onClick={() => handleLogout()}
							>
								<li className="top-list-item">LOGOUT</li>
							</Link>
						</>
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
				</div>
			</div>
		</div>
	);
}

export default Topbar;
