import { Topbar } from "./components/components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	Home,
	SinglePost,
	WritePost,
	Register,
	Login,
	UserSettings,
} from "./pages/pages";
// import ProtectedRoute from "./protetedRoute/ProtectedRoute";

function App() {
	const user = false;
	return (
		<>
			<BrowserRouter>
				<Topbar />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/login" element={user ? <Home /> : <Login />} />
					<Route path="/register" element={user ? <Home /> : <Register />} />
					<Route
						path="/settings"
						element={user ? <UserSettings /> : <Register />}
					/>
					<Route
						path="/write/:userId"
						element={user ? <WritePost /> : <Register />}
					/>
					<Route path="/post/:postId" element={<SinglePost />} />
					{/* <Route
						path="/user/settings/:userId"
						element={
							<ProtectedRoute>
								<UserSettings />
							</ProtectedRoute>
						}
					/> */}
				</Routes>
			</BrowserRouter>
		</>
	);
}
export default App;
