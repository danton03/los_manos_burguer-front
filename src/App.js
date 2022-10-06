import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import customTheme from "./assets/styles/customTheme";

function App() {
	return (
		<ChakraProvider theme={customTheme}>
			<BrowserRouter>
				<Routes>
					<Route  path="/login" element={<LoginPage />}/>
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
