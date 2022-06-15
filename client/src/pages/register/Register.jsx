import "./register.css";

import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Register() {
	const userInfoDefault = { username: "", email: "", password: "", img: "" };
	const [newUserInfo, setNewUserInfo] = useState(userInfoDefault);
	const [isSecret, setIsSecret] = useState(true);
	const { username, email, password, img } = newUserInfo;

	const handleNewUserInfo = (e) => {
		setNewUserInfo((prev) => {
			console.log(e.target.value);
			return { ...prev, [e.target.id]: e.target.value };
		});
	};

	return (
		<main className="main-section register-main">
			<div className="section-center register-wrapper">
				<h1 className="page-title">register</h1>
				<Link to="/login">
					<button className="generic-btn-01 login-btn small-btn btn-position-top-right">
						Login
					</button>
				</Link>
				<form className="log-form login-form">
					<label htmlFor="usernam">username</label>
					<input
						type="text"
						id="username"
						placeholder="enter your username..."
						onChange={handleNewUserInfo}
						value={username}
					/>
					<label htmlFor="email">email</label>
					<input
						type="email"
						id="email"
						placeholder="enter your email..."
						onChange={handleNewUserInfo}
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
						onChange={handleNewUserInfo}
						value={password}
						placeholder="enter your password..."
					/>
					<button className="generic-btn-01 register-btn big-btn">
						register
					</button>
				</form>
			</div>
		</main>
	);
}

export default Register;
