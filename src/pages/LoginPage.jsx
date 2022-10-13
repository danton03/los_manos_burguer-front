import { Box, Heading, Image, Stack, VStack, Flex, Center } from "@chakra-ui/react";
import LoginForm from "../components/Form/LoginForm";
import logoImg from "../assets/images/logo.png";
import Navbar from "../components/Navbar/Navbar";

export default function LoginPage(){
	return(
		<Flex flexDirection={"column"} boxSizing={"border-box"} >
			<VStack minH="100vh" padding={3} boxSizing={"border-box"} spacing={5} >
				<Navbar />
				<Center gap={5} flexDirection="column" minH={"86vh"} justifyContent={"center"}>
					<Box maxW={140}>
						<Image src={logoImg}/>
					</Box>
					<Stack spacing={6}>
						<Heading 
							as={"h2"} 
							size="lg" 
							colorScheme={"orange"} 
							color="orange.500"
							textAlign={"center"}
							fontFamily={"'Silkscreen', cursive"}
						>
							Login
						</Heading>
						<LoginForm />
					</Stack>
				</Center>
			</VStack>
		</Flex>
	);
}