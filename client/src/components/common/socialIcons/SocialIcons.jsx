import "./socialIcons.css";
import {
	FaFacebookSquare,
	FaInstagram,
	FaPinterestSquare,
	FaTwitterSquare,
	FaSearch,
} from "react-icons/fa";

function SocialIcons({ position }) {
	return (
		<div className={`social-icons-wrapper ${position}`}>
			<FaFacebookSquare className="social-icon" />{" "}
			<FaInstagram className="social-icon" />{" "}
			<FaPinterestSquare className="social-icon" />
			<FaTwitterSquare className="social-icon" />
		</div>
	);
}

export default SocialIcons;
