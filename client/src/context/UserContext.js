import { useEffect, useContext, createContext, useReducer } from "react";
import UserReducer from "./UserReducer";

const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem("user")),
	loading: false,
	error: false,
};

const UserContext = createContext(INITIAL_STATE);

function UserContextProvider({ children }) {
	const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
	const values = { ...state, dispatch };
	console.log(state);

	return (
		<UserContext.Provider value={{ ...values }}>
			{children}
		</UserContext.Provider>
	);
}

export const useUserContext = () => {
	return useContext(UserContext);
};
export default UserContextProvider;
