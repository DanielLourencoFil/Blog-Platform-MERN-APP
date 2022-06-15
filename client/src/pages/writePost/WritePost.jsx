import "./writePost.css";
import { FaPlus } from "react-icons/fa";
import image from "../../assets/greece-by-constantinos-kollias.jpg";

import React from "react";

function WritePost() {
	return (
		<main className="main-section">
			<form className="section-center write-wrapper">
				<img src={image} alt="" className="write-img" />
				<div className="write form-inputs">
					<label htmlFor="file-input">
						<FaPlus className="write-upload-btn" />
					</label>
					<input type="file" id="file-input" style={{ display: "none" }} />
					<input
						type="text"
						placeholder="Title"
						className="write-title-input write-input"
						autoFocus={true}
					/>
				</div>
				<div className="write form-inputs">
					<textarea
						placeholder="Tell your story..."
						type="text"
						className="write-text-input write-input"
					></textarea>
				</div>
				<button className="write-submit-btn">Publish</button>
			</form>
		</main>
	);
}

export default WritePost;
