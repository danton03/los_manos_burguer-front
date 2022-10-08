import { Box, Heading, Image, VStack, Grid } from "@chakra-ui/react";
import Mario404Gif from "../assets/images/Mario404.gif";

import Navbar from "../components/Navbar/Navbar";

export default function Error404Page(){
	return(
		<Box textAlign="center" fontSize="xl">
			<Grid minH="100vh" p={3}>
				<Navbar />
				<VStack >
					<Box>
						<Image src={Mario404Gif} maxW={200} />
					</Box>
					<Heading 
						as={"h1"}
						size={"2xl"} 
						colorScheme={"orange"}
						color="orange.500"
						maxW={800}
					>
						{
							"Ops, não conseguimos encontrar essa página. Erro 404."
						}
					</Heading>
				</VStack>
			</Grid>
		</Box>
	);
}