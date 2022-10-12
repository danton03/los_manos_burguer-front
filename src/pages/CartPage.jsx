import { Center, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import CartProduct from "../components/CartProduct/CartProduct";
import Navbar from "../components/Navbar/Navbar";
import UserContext from "../contexts/UserContext";

export default function CartPage(){
	const {cart} = useContext(UserContext);

	function renderProducts() {
		return cart.map((product, index) => {
			return(
				<VStack w={"100%"} maxW={"7xl"} key={index}>
					<CartProduct product={product} />
				</VStack>
			);
		});
	}

	return(
		<Flex flexDirection={"column"} boxSizing={"border-box"}>
			<VStack minH="100vh" padding={3} boxSizing={"border-box"} spacing={5}>
				<Navbar />
				<VStack spacing={5} boxSizing={"border-box"} pb={"6rem"} width="100%">
					<Heading 
						fontSize={"lg"} 
						fontFamily={"'Silkscreen', cursive"}
						alignSelf={"flex-start"}
					>
						Carrinho
					</Heading>
					{
						cart.length?
							renderProducts() 
							: <Center minH="80vh">
								<Text>
                  Seu carrinho está vazio.
								</Text>
							</Center>
					}
				</VStack>
			</VStack>
		</Flex>
	);
}