import { Heading, Stack, VStack, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";

export default function ProductsPage(){
	return(
		<Flex flexDirection={"column"} >
			<VStack minH="100vh" minW="100vw" padding={3}>
				<Navbar />
				<VStack spacing={5}>
					<Stack maxW={360} spacing={4} alignItems={"center"}>
						<Heading 
							as={"h2"} 
							size="lg" 
							colorScheme={"orange"} 
							color="orange.500"
							fontFamily={"'Silkscreen', cursive"}
						>
							Essa é a página de produtos!
						</Heading>
					</Stack>
				</VStack>
			</VStack>
		</Flex>
	);
}