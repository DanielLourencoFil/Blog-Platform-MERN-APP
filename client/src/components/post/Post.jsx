import "./post.css";
import React from "react";
import { Link } from "react-router-dom";
import postImg from "../../assets/blog-1-daniil-onischenko.jpg";

function Post({ post }) {
	const handleSinglePost = () => {
		console.log("post title");
	};
	const handleSingleAuthorPosts = async () => {};
	return (
		<article className="post-wrapper">
			{post.photo && (
				<img src={post.photo} alt={post.title} className="post-img" />
			)}

			<header className="post-header">
				<div className="categories-tags-wrapper">
					{post.categories.map((category, index) => {
						return (
							<span key={index} className="post-tags">
								{category}
							</span>
						);
					})}
				</div>
				<Link to={`/post/${post._id}`}>
					<h1 className="post-title" onClick={handleSinglePost}>
						{post.title}
					</h1>
				</Link>
				<p className="post-tags">{new Date(post.createdAt).toDateString()}</p>
			</header>
			<p className="post-text">{post.desc}</p>
			<Link to={`/?user=${post.username}`}>
				<p className="post-author" onClick={handleSingleAuthorPosts}>
					By {post.username}
				</p>
			</Link>
		</article>
	);
}

export default Post;
