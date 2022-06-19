import "./singlePost.css";
import postImg from "../../assets/blog-1-daniil-onischenko.jpg";
import { Sidebar } from "../../components/components";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";

function SinglePost() {
	const { user } = useUserContext();
	const textArea = useRef(null);
	const titlePost = useRef(null);
	const submitBtn = useRef(null);
	const [post, setPost] = useState({ title: "", desc: "" });
	const { postId } = useParams();
	const [textAreaResize, setTextAreaResize] = useState(200);
	const [loading, setLoading] = useState(true);
	const [isEdit, setIsEdit] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		let updatePost = {
			username: user.username,
			title: post.title,
			desc: post.desc,
		};
		try {
			await axios.put(`/post/${postId}`, updatePost);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		const fetchPost = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`/post/${postId}`);

				setPost(res.data.payload);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(true);
			}
		};
		fetchPost();
	}, []);
	useEffect(() => {
		if (!loading) {
			setTextAreaResize(textArea.current.scrollHeight);
		}
	}, [loading]);

	const handleEdit = () => {
		setIsEdit(!isEdit);
		setTimeout(() => {
			titlePost.current.focus();
		}, 100);
	};
	const handleDelete = async () => {
		window.confirm("Are sure you want to delete this post?");
		await axios.delete(`/post/${postId}`, {
			data: { username: user.username },
		});
	};
	return (
		<main className="main-section ">
			<div className="section-center single-post-section">
				<form className=" single-post-wrapper">
					{user.portfolioPic && (
						<img src={user.porfolioPic} alt="" className="write-img" />
					)}
					<div className="single-post-inputs">
						<header className="single-post-header">
							<div className="edit-btns-wrapper">
								<label htmlFor="file-input">
									<FaPlus className="write-upload-btn" />
								</label>
								<input
									type="file"
									id="file-input"
									style={{ display: "none" }}
								/>
								<div>
									<FaEdit
										className="single-post-edit-btn"
										onClick={handleEdit}
									/>
									<FaTrash
										className="single-post-delete-btn"
										onClick={handleDelete}
									/>
								</div>
							</div>
							<input
								ref={titlePost}
								type="text"
								placeholder="Title"
								className="single-post-title"
								disabled={!isEdit}
								onChange={(e) =>
									setPost((prev) => {
										return { ...prev, title: e.target.value };
									})
								}
								value={post.title}
							/>

							<div className="single-post-sub-header">
								<Link to={`/?user=${post.username}`}>
									<p className="single-post-author">
										Author: <b>{post.username}</b>
									</p>
								</Link>
								<p className="single-post-date">
									{new Date(post.createdAt).toDateString()}
								</p>
							</div>
						</header>
					</div>
					<div className="form-inputs">
						<textarea
							ref={textArea}
							placeholder="Tell your story..."
							type="text"
							className="single-post-textarea"
							disabled={!isEdit}
							onChange={(e) =>
								setPost((prev) => {
									return { ...prev, desc: e.target.value };
								})
							}
							value={post.desc}
							style={{ height: textAreaResize + "px" }}
						></textarea>
					</div>
					<button
						ref={submitBtn}
						className="write-submit-btn single-post-submit-btn"
						onClick={handleSubmit}
						disabled={!isEdit}
					>
						Publish
					</button>

					<div className="single-post">
						{post.photo && (
							<img
								src={post.photo}
								alt={post.title}
								className="single-post-img"
							/>
						)}
					</div>
				</form>
				<Sidebar />
			</div>
		</main>
	);
}

export default SinglePost;
