import "./header.css";
import bgImage from "../../assets/greece-by-constantinos-kollias.jpg";
import React from "react";

function Header() {
	return (
		<div className="header">
			<div className="header-titles-wrapper">
				<span className="header-title-secondary">Travel &amp; Life</span>
				<span className="header-title-primary">Blog</span>
			</div>
			<img src={bgImage} alt="acropole-de-atenas" className="header-img" />
		</div>
	);
}

export default Header;
