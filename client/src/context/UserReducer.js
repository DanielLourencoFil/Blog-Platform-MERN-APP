const UserReducer = (state, action) => {
	switch (action.type) {
		case "USER_STARTING":
			return {
				user: null,
				loading: true,
				error: false,
			};
		case "USER_AUTH":
			return {
				user: action.payload,
				loading: false,
				error: false,
			};
		case "USER_FAILURE":
			return {
				user: null,
				loading: false,
				error: true,
			};
		case "USER_LOGOUT":
			return {
				user: null,
				loading: false,
				error: false,
			};

		default:
			return state;
	}
};

export default UserReducer;
