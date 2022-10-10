import { Heading, VStack, Flex, Spinner, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel/Carousel";
import Navbar from "../components/Navbar/Navbar";
import productsService from "../services/productsService";

export default function ProductsPage(){
	const [products, setProducts] = useState({});

	useEffect(() => {
		async function getProducts() {
			const productsData = await productsService.getProducts();
			setProducts(productsData);
		}
		getProducts();
	}, []);

	function renderProducts() {
		const categories = Object.keys(products);
		return categories.map((category, index) => {
			return(
				<VStack w={"100%"} key={index}>
					<Heading 
						fontSize={"lg"} 
						fontFamily={"'Silkscreen', cursive"}
						alignSelf={"flex-start"}
					>
						{ category }
					</Heading>
					<Carousel products={ products[category] } />
				</VStack>
			);
		});
	}

	return(
		<Flex flexDirection={"column"} boxSizing={"border-box"}>
			<VStack minH="100vh" padding={3} boxSizing={"border-box"}>
				<Navbar />
				<VStack spacing={5} boxSizing={"border-box"} pb={6}>
					{
						Object.keys(products).length?
							renderProducts() 
							: <Center minH="80vh"><Spinner color='orange.400' size={"xl"} /></Center>
					}
				</VStack>
			</VStack>
		</Flex>
	);
}