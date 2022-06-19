import "./writePost.css";
import image from "../../assets/greece-by-constantinos-kollias.jpg";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

import { useState } from "react";
import { useUserContext } from "../../context/UserContext";

function WritePost() {
	const { user } = useUserContext();
	const [post, setPost] = useState({ title: "", desc: "" });

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("/post", post);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<main className="main-section">
			<form className="section-center write-wrapper">
				{/* <img src={image} alt="" className="write-img" /> */}
				<div className="write form-inputs">
					<label htmlFor="file-input">
						<FaPlus className="write-upload-btn" />
					</label>
					<input type="file" id="file-input" style={{ display: "none" }} />
					<input
						data-value="title"
						type="text"
						placeholder="Title"
						className="write-title-input write-input"
						autoFocus={true}
						onChange={(e) =>
							setPost((prev) => {
								return { ...prev, title: e.target.value };
							})
						}
						value={post.title}
					/>
				</div>
				<div className="write form-inputs">
					<textarea
						data-value="desc"
						placeholder="Tell your story..."
						type="text"
						className="write-text-input write-input"
						onChange={(e) =>
							setPost((prev) => {
								return { ...prev, desc: e.target.value };
							})
						}
						value={post.desc}
					></textarea>
				</div>
				<button className="write-submit-btn" onClick={handleSubmit}>
					Publish
				</button>
			</form>
		</main>
	);
}

export default WritePost;
