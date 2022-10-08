import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import customTheme from "./assets/styles/customTheme";
import HomePage from "./pages/HomePage";
import Error404Page from "./pages/Error404Page";
import SignupPage from "./pages/SignupPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
	return (
		<ChakraProvider theme={customTheme}>
			<BrowserRouter>
				<Routes>
					<Route  path="/" element={<HomePage />}/>
					<Route  path="/login" element={<LoginPage />}/>
					<Route  path="/signup" element={<SignupPage />}/>
					<Route  path="/products" element={<ProductsPage />}/>
					<Route  path="*" element={<Error404Page />}/>
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
