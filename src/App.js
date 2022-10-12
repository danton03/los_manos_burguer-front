import { ChakraProvider } from "@chakra-ui/react";
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import customTheme from "./assets/styles/customTheme";
import HomePage from "./pages/HomePage";
import Error404Page from "./pages/Error404Page";
import SignupPage from "./pages/SignupPage";
import ProductsPage from "./pages/ProductsPage";
import UserContext from "./contexts/UserContext";
import { useState } from "react";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { CheckoutErrorToast } from "./components/CheckoutErrorToast/CheckoutErrorToast";


function App() {
	const [ user, setUser ] = useState({});
	const token = localStorage.getItem("token");
	const [cart, setCart] = useState([]);
	
	if(user.token) {
		localStorage.setItem("token", user.token);
	} else if (token) {		
		setUser({
			token
		});
	}
	
	return (
		<UserContext.Provider value={{user, setUser, cart, setCart}}>
			<ChakraProvider theme={customTheme}>
				<BrowserRouter>
					<Routes>
						<Route  path="/" element={<HomePage />}/>
						<Route path="/login" element={ !user.token ? <LoginPage /> : <Navigate to="/" replace/> } />
						<Route path="/signup" element={ !user.token ? <SignupPage /> : <Navigate to="/" replace/> } />
						<Route  path="/products" element={<ProductsPage />}/>
						<Route  path="/products/:productId" element={<ProductPage />}/>
						<Route  path="/cart" element={<CartPage />}/>
						<Route  path="/checkout" element={ cart.length ? <CheckoutPage /> : (
							<>
								<Navigate to="/" replace/> 
								<CheckoutErrorToast />
							</>
						)}/>
						<Route  path="*" element={<Error404Page />}/>
					</Routes>
				</BrowserRouter>
			</ChakraProvider>
		</UserContext.Provider>
	);
}

export default App;
