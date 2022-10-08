import { Box, Heading, Image, Stack, VStack, Grid } from "@chakra-ui/react";
import LoginForm from "../components/Form/LoginForm";
import logoImg from "../assets/images/logo.png";
import Navbar from "../components/Navbar/Navbar";

export default function LoginPage(){
	return(
		<Box textAlign="center" fontSize="xl">
			<Grid minH="100vh" p={3}>
				<Navbar />
				<VStack spacing={5}>
					<Box maxW={140}>
						<Image src={logoImg}/>
					</Box>
					<Stack spacing={6}>
						<Heading 
							as={"h2"} 
							size="lg" 
							colorScheme={"orange"} 
							color="orange.500"
							fontFamily={"'Silkscreen', cursive"}
						>
							Login
						</Heading>
						<LoginForm />
					</Stack>
				</VStack>
			</Grid>
		</Box>
	);
}