import "./singlePost.css";
import postImg from "../../assets/blog-1-daniil-onischenko.jpg";
import { Sidebar } from "../../components/components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";

function SinglePost() {
	const { user } = useUserContext();
	const { postId } = useParams();
	const [post, setPost] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPost = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`/post/${postId}`);
				console.log(res.data.payload);
				setPost(res.data.payload);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(true);
			}
		};
		fetchPost();
	}, []);
	console.log("edit");
	return (
		<main className="main-section">
			<div className="section-center single-post-wrapper">
				{loading ? (
					<h1>Loading...</h1>
				) : (
					<div className="single-post">
						{post.photo && (
							<img
								src={post.photo}
								alt={post.title}
								className="single-post-img"
							/>
						)}

						<header className="single-post-header">
							<div className="title-and-edit-btns-wrapper">
								<h1 className="single-post-title">{post.title}</h1>
								<div className="edit-btns-wrapper">
									<FaEdit className="single-post-edit-btn" />
									<FaTrash className="single-post-delete-btn" />
								</div>
							</div>
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
						<input className="single-post-text">{post.desc}</input>
					</div>
				)}
				<Sidebar />
			</div>
		</main>
	);
}

export default SinglePost;
