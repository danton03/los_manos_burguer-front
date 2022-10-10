function headerConfig(token) {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	return config;
}

const apiUtil = { headerConfig };

export default apiUtil;