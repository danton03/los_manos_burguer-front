/* eslint-disable react/prop-types */
import { Button, Flex, Heading, Image } from "@chakra-ui/react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import QuantitySelector from "../QuantitySelector/QuantitySelector";

export default function CartProduct(props){
	const { product } = props;
	const { cart, setCart } = useContext(UserContext);
  
	function handleDeleteProduct() {
		const newCart = cart.filter((item) => {
			return item.id !== product.id;
		});
		setCart(newCart);
	}

	return(
		<Flex 
			className="produto"
			position={"relative"}
			alignItems={"center"}
			justifyContent="space-between"
			w="100%"
			borderTop={"solid 1px #F8F8F9"}
			p="0.625rem 0"
		>
			<Flex
				alignItems={"center"}
				boxSizing={"border-box"}
				gap="0.625rem"
				width={"100%"}
			>
				<Image 
					src={product.imageUrl} 
					alt={product.name} 
					w={"6.875rem"}
					h={"6.875rem"}
					objectFit={"cover"}
					rounded="md"
				/>
				<Flex 
					flexDirection={"column"}
					alignItems={"center"}
					width={"100%"}
				>
					<Flex 
						className="descricao" 
						flexDirection={"column"} 
						justifyContent="space-between"
						boxSizing="border-box"
						width={"100%"}
						gap={3} 
					>
						<Heading 
							as={"h4"} 
							size={"1.15rem"} 
							w={"80%"}
						>
							{product.name}
						</Heading>
						<Flex 
							className="infos"
							alignItems={"center"}
							boxSizing={"border-box"}
							gap="0.625rem"
						>
							<Flex 
								className="container-info"
								alignItems={"center"}
								justifyContent="center"
								backgroundColor={"orange.200"}
								color={"gray.900"}
								rounded={"md"}
								p={"0 0.25rem"}
							>
								<Heading 
									as={"h5"}
									size={"sm"}
									opacity="100%"
								>
                Quantidade: {product.amount}
								</Heading>
							</Flex>
						</Flex>
						
					</Flex>
					<Flex 
						flexDirection={"row"} 
						width={"100%"} 
						gap={5}
						alignItems={"center"} 
						flexWrap={"wrap"} 
						justifyContent={"space-between"}
						pr={2}
						mt={3}
					>
						<Heading 
							as={"p"} 
							className="valor"
							fontSize={"1.14rem"}
						>
							{`R$ ${(((product.price*product.amount)/100).toFixed(2)).replace(".",",")}`}
						</Heading>
						<QuantitySelector 
							cart={cart} 
							setCart={setCart} 
							productId={product.id} 
							amount={product.amount}
							position={"absolute"}
							top={3}
							right={2}
							zIndex={1}
						/>
					</Flex>
					<Button 
						className="excluir" 
						onClick={handleDeleteProduct} 
						colorScheme={"red"}
						background={"red.100"}
						color={"red.500"}
						position={"absolute"}
						top={3}
						right={2}
					>
						<ion-icon name="trash-outline" size="64px"/>
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
}