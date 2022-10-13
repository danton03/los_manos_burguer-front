import { Box, Heading, Image, Stack, VStack, Button, Flex, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/images/logo.png";
import Navbar from "../components/Navbar/Navbar";

export default function HomePage(){
	const navigate = useNavigate();

	return(
		<Flex flexDirection={"column"} boxSizing={"border-box"} >
			<VStack minH="100vh" padding={3} boxSizing={"border-box"} spacing={5} >
				<Navbar />
				<Center gap={5} flexDirection="column" minH={"86vh"} justifyContent={"center"}>
					<Box maxW={140}>
						<Image src={logoImg}/>
					</Box>
					<Stack maxW={360} spacing={4} alignItems={"center"}>
						<Heading 
							as={"h2"} 
							size="lg" 
							colorScheme={"orange"} 
							color="orange.500"
							textAlign={"center"}
							fontFamily={"'Silkscreen', cursive"}
						>
							Los Manos Burguer
						</Heading>
						<Button 
							type="button"
							onClick={() => navigate("/products")} 
							color="white" 
							fontFamily={"'Silkscreen', cursive"}
							colorScheme={"orange"}
							w={"100%"}
							maxW={250}
							h={12}
						>
							{"þ Fazer um pedido"}
						</Button>
					</Stack>
				</Center>
			</VStack>
		</Flex>
	);
}