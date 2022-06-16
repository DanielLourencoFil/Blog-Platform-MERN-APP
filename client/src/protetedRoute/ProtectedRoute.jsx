import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import axios from "axios";

function ProtectedRoute({ children }) {
	const [loading, setLoading] = useState(true);
	const [isUserAuth, setIsUserAuth] = useState(false);
	const { userId } = useParams();
	const { setUserAuth } = useUserContext();

	useEffect(() => {
		const userAuth = async () => {
			try {
				const res = await axios.get(`/user/${userId}`);
				console.log(res.data.payload);
				setIsUserAuth(res.data.payload._id === userId);
				setLoading(false);
				setUserAuth(res.data.payload._id === userId);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		userAuth();
	}, []);
	console.log(isUserAuth);
	if (loading) {
		return (
			<div className="section-center">
				<h1>Loading...</h1>
			</div>
		);
	}
	return isUserAuth ? children : <Navigate to={"/"} />;
}

export default ProtectedRoute;
