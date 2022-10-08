import api from "./api";

async function signup(userData) {
	try {
		const response = await api.post("/signup", userData);
		return response;
	} catch (error) {
		return error;
	}
}

async function login(userCredentials) {
	try {
		const response = await api.post("/login", userCredentials);
		return response;
	} catch (error) {
		return error;
	}
}

const authService = {
	signup,
	login,
};

export default authService;