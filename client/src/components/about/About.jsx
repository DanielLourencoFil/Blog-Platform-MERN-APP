import "./about.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { TitleSection } from "../components";
import myImage from "../../assets/man-alone-by-cristofer-maximilian.jpg";
import axios from "axios";

function About() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const { id } = useSearchParams();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get(`/user/${id}`);
			} catch (error) {
				console.log(error);
			}
		};
	}, []);
	return (
		<div className="about-wrapper" id="about">
			<TitleSection title="About Me" />
			<img src={myImage} alt="user-about" className="user-about-img" />
			<p className="about-text">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem saepe non
				ab.
			</p>
		</div>
	);
}

export default About;
