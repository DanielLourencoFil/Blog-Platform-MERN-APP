import React from "react";
import { Navigate, useParams } from "react-router-dom";

const auth = "daniel";
function ProtectedRoute({ children }) {
	const { userId } = useParams();
	const isUserAuth = auth === userId;
	return isUserAuth ? children : <Navigate to={"/"} />;
}

export default ProtectedRoute;
