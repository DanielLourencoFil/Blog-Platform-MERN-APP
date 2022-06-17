import "./login.css";

import { useState } from "react";
import { useUserContext } from "../../context/UserContext";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
	const userInfoDefault = { username: "", password: "" };
	const [userInfo, setUserInfo] = useState(userInfoDefault);
	const [isSecret, setIsSecret] = useState(true);
	const { loading, dispatch } = useUserContext();
	// console.log(useUserContext());
	const { username, password } = userInfo;

	const handleUserInfo = (e) => {
		setUserInfo((prev) => {
			console.log(e.target.value);
			return { ...prev, [e.target.id]: e.target.value };
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "USER_STARTING" });
		try {
			const res = await axios.post("/auth/login", userInfo);
			res && dispatch({ type: "USER_AUTH", payload: res.data.payload });

			setUserInfo(userInfoDefault);
		} catch (error) {
			console.log(error);
			dispatch({ type: "USER_FAILURE" });
		}
	};
	console.log(loading);
	return (
		<main className="main-section register-main">
			<div className="section-center register-wrapper">
				<h1 className="page-title">login</h1>
				<Link to="/register">
					<button className="generic-btn-01 register-btn small-btn btn-position-top-right">
						register
					</button>
				</Link>
				<form className="log-form login-form" onSubmit={handleSubmit}>
					<label htmlFor="username">username</label>
					<input
						type="text"
						id="username"
						placeholder="enter your username..."
						onChange={handleUserInfo}
						value={username}
					/>
					<label htmlFor="password">
						password{" "}
						{isSecret ? (
							<FaEye
								className="secret-btn-2"
								onClick={() => setIsSecret(!isSecret)}
							/>
						) : (
							<FaEyeSlash
								className="secret-btn-2"
								onClick={() => setIsSecret(!isSecret)}
							/>
						)}
					</label>

					<input
						type={`${isSecret ? "password" : "text"}`}
						id="password"
						onChange={handleUserInfo}
						value={password}
						placeholder="enter your password..."
					/>
					<button
						type="submit"
						className="generic-btn-01 login-btn big-btn"
						disabled={loading}
					>
						login
					</button>
				</form>
			</div>
		</main>
	);
}

export default Login;
