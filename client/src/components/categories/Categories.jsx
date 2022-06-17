import "./categories.css";
import { TitleSection } from "../components";
import axios from "axios";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Categories() {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPost = async () => {
			setLoading(true);
			try {
				const res = await axios.get("/category");
				setCategories(res.data.payload);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(true);
			}
		};
		fetchPost();
	}, []);
	return (
		<div className="categories-wrapper">
			<TitleSection title={"Categories"} />
			<ul className="categories">
				{categories.map((category, index) => {
					return (
						<Link to={`/?category=${category.name}`} key={category._id}>
							<li className="category">{category.name}</li>
						</Link>
					);
				})}
			</ul>
		</div>
	);
}

export default Categories;
