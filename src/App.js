import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import customTheme from "./assets/styles/customTheme";
import Error404Page from "./pages/Error404Page";
import SignupPage from "./pages/SignupPage";

function App() {
	return (
		<ChakraProvider theme={customTheme}>
			<BrowserRouter>
				<Routes>
					<Route  path="/login" element={<LoginPage />}/>
					<Route  path="/signup" element={<SignupPage />}/>
					<Route  path="*" element={<Error404Page />}/>
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
