import "./followUs.css";
import { TitleSection, SocialIcons } from "../components";

function FollowUs() {
	return (
		<div className="follow-us-wrapper" id="contact">
			<TitleSection title="Follow Us" />
			<SocialIcons position={"social-icon-position-center"} />
		</div>
	);
}

export default FollowUs;
