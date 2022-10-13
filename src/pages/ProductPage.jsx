/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Box,
	Container,
	Stack,
	Text,
	Image,
	Flex,
	VStack,
	Button,
	Heading,
	SimpleGrid,
	StackDivider,
	useColorModeValue,
	Center,
	Spinner,
	useToast
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import UserContext from "../contexts/UserContext";
import productsService from "../services/productsService";

export default function ProductPage() {
	const { cart, setCart } = useContext(UserContext);
	const { productId } = useParams(null);
	const [product, setProduct] = useState();
	const [counter, setCounter] = useState(1);
	const toast = useToast();

	/*const navigate = useNavigate(); */
	useEffect(() => {
		async function getProducts() {
			const productData = await productsService.getProductById(productId);
			setProduct(productData);
			console.log(productData);
		}
		getProducts();
	},[]);

	function decrement() {
		if (counter > 1) {
			setCounter(counter-1);
		}
	}

	function showSuccessToast() {
		return toast({
			title: "Adicionado ao carrinho",
			status: "success",
			position: "top-right",
			duration: 4000,
			isClosable: true,
		});
	}

	function handleAddToCart() {
		let productAlreadyInCart = false;
		
		const newCart = cart.map((item) => {
			if(item.id === product.id){
				productAlreadyInCart = true; 
				return {...item, amount: item.amount + counter};
			}
			return item;
		});
		
		if(!productAlreadyInCart){
			const productToAdd = {
				id: product.id,
				name: product.name,
				imageUrl:  product.imageUrl,
				price: product.price,
				amount: counter,
				category: product.category
			};

			setCart([...cart, productToAdd]);
			return showSuccessToast();
		}
	
		setCart(newCart);
		return showSuccessToast();
	}

	return (
		<Flex flexDirection={"column"} boxSizing={"border-box"}>
			<VStack minH="100vh" padding={3} boxSizing={"border-box"}>
				<Navbar />
				<Container maxW={"7xl"}>
					{product ?
						<SimpleGrid
							columns={{ base: 1, lg: 2 }}
							spacing={{ base: 8, md: 10 }}
							py={{ base: 18, md: 18 }}
						>
							<Flex> 
								<Image
									rounded={"md"}
									alt={"product image"}
									src={product.imageUrl}
									fit={"cover"}
									align={"center"}
									w={"100%"}
									h={{ base: "100%", sm: "400px", lg: "500px" }}
								/>
							</Flex>
							<Stack spacing={{ base: 6, md: 10 }}>
								<Box as={"header"}>
									<Heading
										lineHeight={1.1}
										fontWeight={600}
										fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
										fontFamily={"'Silkscreen', cursive"}
									>
										{product.name}
									</Heading>
									<Box 
										w={"100%"} 
										display={"flex"} 
										boxSizing={"border-box"} 
										justifyContent={"space-between"}
										alignItems={"center"}
										pt={6}
									>
										<Text
											color={useColorModeValue("gray.900", "gray.200")}
											fontWeight={300}
											fontSize={"2xl"}
											w={"fit-content"}
										>
											{`R$ ${(((product.price*counter)/100).toFixed(2)).replace(".", ",")}`}
										</Text>
										<Flex 
											className="counter" 
											gap={2.5} 
											flexDirection={"row"}
											w={"fit-content"}
											flexWrap={"nowrap"}
										>
											<Button 
												type="button"
												onClick={decrement}
												colorScheme={"orange"}
											>
                				- 
											</Button>
											<Box 
												as={"span"} 
												display={"flex"}
												alignItems={"center"}
												justifyContent={"center"}
											>
												{counter}
											</Box>
											<Button 
												type="button"
												onClick={() => setCounter(counter+1)}
												colorScheme={"orange"}
											>
                				+ 
											</Button>
										</Flex>
									</Box>
								</Box>

								<Stack
									spacing={{ base: 4, sm: 6 }}
									direction={"column"}
									divider={
										<StackDivider
											borderColor={useColorModeValue("gray.200", "gray.600")}
										/>
									}>
									<VStack spacing={{ base: 4, sm: 6 }}>
										<Text
											color={useColorModeValue("gray.500", "gray.400")}
											fontSize={"xl"}
											fontWeight={"300"}
											w={"100%"}
										>
											Descrição
										</Text>
										<Text fontSize={"lg"} width={"100%"}>
											{product.description}
										</Text>
									</VStack>
								</Stack>

								<Button
									rounded={"md"}
									w={"full"}
									mt={8}
									size={"lg"}
									py={"7"}
									colorScheme={"orange"}
									textTransform={"uppercase"}
									fontFamily={"'Silkscreen', cursive"}
									_hover={{
										transform: "translateY(2px)",
										boxShadow: "lg",
									}}
									onClick={handleAddToCart}
								>
									Adicionar ao carrinho
								</Button>
							</Stack>
						</SimpleGrid>
						:
						<Center minH="80vh"><Spinner color='orange.400' size={"xl"} /></Center>
					}
				</Container>
			</VStack>
		</Flex>
	);
}