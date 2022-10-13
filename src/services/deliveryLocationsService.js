import apiUtil from "../utils/apiUtil";
import api from "./api";

async function getLocations() {
	try {
		const response = await api.get("/delivery");
		return response.data;
	} catch (error) {
		console.log(error.response.status);
	}
}

async function getLocationsWithUserAddresses(token) {
	try {
		const config = apiUtil.headerConfig(token);
		const response = await api.get("/delivery/clients", config);
		return response.data;
	} catch (error) {
		console.log(error.response.status);
	}
}

const deliveryService = {
	getLocations,
	getLocationsWithUserAddresses
};

export default deliveryService;