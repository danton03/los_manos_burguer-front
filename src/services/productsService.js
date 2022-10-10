import api from "./api";

async function getProducts() {
	try {
		const response = await api.get("/products");
		return response.data;
	} catch (error) {
		console.log(error.response.status);
	}
}

const productsService = {
	getProducts
};

export default productsService;