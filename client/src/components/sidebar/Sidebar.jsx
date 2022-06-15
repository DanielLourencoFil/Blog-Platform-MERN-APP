import "./sidebar.css";
import { About, Categories, FollowUs } from "../components";

import React from "react";

function Sidebar() {
	return (
		<aside className="side-section-wrapper">
			<About />
			<Categories />
			<FollowUs />
		</aside>
	);
}

export default Sidebar;
