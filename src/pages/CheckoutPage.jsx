import { Flex, Heading, VStack } from "@chakra-ui/react";
//import { useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
//import UserContext from "../contexts/UserContext";

export default function CheckoutPage() {
	//const { cart } = useContext(UserContext);

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
              Finalizar o pedido
					</Heading>
            
				</VStack>
			</VStack>
		</Flex>
	);
}