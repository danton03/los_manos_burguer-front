import { Box, Heading, Image, Stack, VStack, Grid, Button } from "@chakra-ui/react";
import logoImg from "../assets/images/logo.png";
import Navbar from "../components/Navbar/Navbar";

export default function HomePage(){
	return(
		<Box textAlign="center" fontSize="xl">
			<Grid minH="100vh" p={3}>
				<Navbar />
				<VStack spacing={5}>
					<Box maxW={140}>
						<Image src={logoImg}/>
					</Box>
					<Stack maxW={360} spacing={4} alignItems={"center"}>
						<Heading 
							as={"h2"} 
							size="lg" 
							colorScheme={"orange"} 
							color="orange.500"
							fontFamily={"'Silkscreen', cursive"}
						>
							Los Manos Burguer
						</Heading>
						<Button 
							type="button" 
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
				</VStack>
			</Grid>
		</Box>
	);
}