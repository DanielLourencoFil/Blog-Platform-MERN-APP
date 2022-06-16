import "./userSettings.css";
import userPic from "../../assets/user-img-1.png";

import { useState, useEffect } from "react";
import { FaPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

function UserSettings() {
	const userInfoDefault = { username: "", email: "", password: "", img: "" };
	const { user } = useUserContext();
	const [updateUserInfo, setUpdateUserInfo] = useState(user);
	const [isSecret, setIsSecret] = useState(true);
	const { username, email, password, profilePic } = updateUserInfo;

	const handleUpdateUserInfo = (e) => {
		setUpdateUserInfo((prev) => {
			console.log(e.target.value);
			return { ...prev, [e.target.id]: e.target.value };
		});
	};

	// console.log(updateUserInfo);
	const { userId } = useParams();
	return (
		<main className="main-section">
			<div className="section-center update-wrapper">
				<form className="log-form update-form">
					<div className="update-header">
						<h1 className="update-title">update your account</h1>
						<button className="update-delete-btn">delete account</button>
					</div>
					<div className="update-profile-pic-wrapper">
						<h2 className="update-profile-pic-title">Profile picture</h2>
						<div className="pic-input-wrapper">
							{profilePic ? (
								<img src={profilePic} alt="" className="profile-pic" />
							) : (
								<BsPersonCircle className="profile-icon" />
							)}

							<label className="profile-upload-btn" htmlFor="img">
								<FaPlus />
							</label>
							<input type="file" id="img" style={{ display: "none" }} />
						</div>
					</div>
					<label htmlFor="username">username</label>
					<input
						type="text"
						id="username"
						onChange={handleUpdateUserInfo}
						value={username}
					/>
					<label htmlFor="email">email</label>
					<input
						type="email"
						id="email"
						onChange={handleUpdateUserInfo}
						value={email}
					/>
					<label htmlFor="password">
						New Password{" "}
						{isSecret ? (
							<FaEye
								className="secret-btn-1"
								onClick={() => setIsSecret(!isSecret)}
							/>
						) : (
							<FaEyeSlash
								className="secret-btn-1"
								onClick={() => setIsSecret(!isSecret)}
							/>
						)}
					</label>

					<input
						type={`${isSecret ? "password" : "text"}`}
						id="password"
						onChange={handleUpdateUserInfo}
						value={password}
					/>
					<button className="generic-btn-01 update-btn">update</button>
				</form>
			</div>
		</main>
	);
}

export default UserSettings;
