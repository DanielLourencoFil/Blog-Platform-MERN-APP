import { Topbar } from "./components/components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	Home,
	SinglePost,
	WritePost,
	Register,
	Login,
	UpdateUserInfo,
} from "./pages/pages";
import ProtectedRoute from "./protetedRoute/ProtectedRoute";

function App() {
	return (
		<>
			<BrowserRouter>
				<Topbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/user/update/:userId"
						element={
							<ProtectedRoute>
								<UpdateUserInfo />
							</ProtectedRoute>
						}
					/>
					<Route path="/post/:postId" element={<SinglePost />} />
					<Route path="/write/:userId" element={<WritePost />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
export default App;
