import "./login.css";

import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Login() {
	const userInfoDefault = { username: "", email: "", password: "" };
	const [userInfo, setUserInfo] = useState(userInfoDefault);
	const [isSecret, setIsSecret] = useState(true);
	const { email, password } = userInfo;

	const handleUserInfo = (e) => {
		setUserInfo((prev) => {
			console.log(e.target.value);
			return { ...prev, [e.target.id]: e.target.value };
		});
	};

	return (
		<main className="main-section register-main">
			<div className="section-center register-wrapper">
				<h1 className="page-title">login</h1>
				<Link to="/register">
					<button className="generic-btn-01 register-btn small-btn btn-position-top-right">
						register
					</button>
				</Link>
				<form className="log-form login-form">
					<label htmlFor="email">email</label>
					<input
						type="email"
						id="email"
						placeholder="enter your email..."
						onChange={handleUserInfo}
						value={email}
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
					<button className="generic-btn-01 login-btn big-btn">login</button>
				</form>
			</div>
		</main>
	);
}

export default Login;
