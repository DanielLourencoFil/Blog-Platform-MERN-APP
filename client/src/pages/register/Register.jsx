import "./register.css";

import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
	const userInfoDefault = { username: "", email: "", password: "", img: "" };
	const [newUserInfo, setNewUserInfo] = useState(userInfoDefault);
	const [isSecret, setIsSecret] = useState(true);
	const { username, email, password, img } = newUserInfo;
	const navigate = useNavigate();

	const handleNewUserInfo = (e) => {
		setNewUserInfo((prev) => {
			return { ...prev, [e.target.id]: e.target.value };
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("/auth/register", newUserInfo);
			const user = await res.data.payload;
			user && navigate("/login");
			setNewUserInfo(userInfoDefault);

			// navigate(`/user/update/${user._id}`);
		} catch (error) {
			console.log(error);
		}
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
				<form className="log-form login-form" onSubmit={handleSubmit}>
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
					<button type="submit" className="generic-btn-01 register-btn big-btn">
						register
					</button>
				</form>
			</div>
		</main>
	);
}

export default Register;
