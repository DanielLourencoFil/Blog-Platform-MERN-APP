import "./home.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header, Post, Sidebar } from "../../components/components";
import axios from "axios";

function Home() {
	const [posts, setPosts] = useState([]);
	const [postsByAuth, setPostsByAuth] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		setLoading(true);
		//url composed based on diferent links/filters, i.e, by Author, by category or all posts
		let url = "/post" + window.location.search;

		const fetchPosts = async () => {
			try {
				const res = await axios.get(url);
				if (res.data.payload) {
					setPosts(res.data.payload);
				} else {
					setPosts([]);
				}
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		fetchPosts();
	}, [searchParams]);
	console.log(posts);
	return (
		<div>
			<Header />
			<main className="main-section-home section-center">
				<div className="posts-wrapper">
					{loading ? (
						<h1>Loading...</h1>
					) : posts.length === 0 ? (
						<h2>Sorry, no posts for this search field</h2>
					) : (
						posts.map((post) => {
							return <Post key={post._id} post={post} />;
						})
					)}
				</div>
				<Sidebar />
			</main>
		</div>
	);
}

export default Home;
