/* eslint-disable react/prop-types */
import {
	Flex,
	Box,
	Image,
	useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ProductCard(props) {
	const navigate = useNavigate();
	const {id, name, imageUrl, description, price} = props;
	return (
		<Flex 
			ml={6} 
			maxW={125}
			minW={"8.6875rem"} 
			alignItems="center" 
			justifyContent="center" 
			boxSizing="border-box"
			onClick={() => navigate(`/products/${id}`)}
		>
			<Box
				bg={useColorModeValue("white", "gray.800")}
				maxW="sm"
				borderWidth="1px"
				rounded="lg"
				shadow="lg"
			>

				<Image
					src={imageUrl}
					alt={`Picture of ${name}`}
					roundedTop="lg"
					h={"5.125rem"}
					w={"8.6875rem"}
					objectFit={"cover"}
				/>

				<Box p={"3"}>
					<Flex justifyContent="space-between" alignContent="center">
						<Box
							fontSize="lg"
							fontWeight="semibold"
							as="h4"
							lineHeight="tight"
							overflow="hidden"
							textOverflow="ellipsis"
							css={{
								display: "-webkit-box",
								"&": {
									WebkitLineClamp: "2",
									WebkitBoxOrient: "vertical"
								}
							}}
						>
							{name}
						</Box>
					</Flex>

					<Flex alignContent="center" maxW={115}>
						<Box
							color={"gray.500"} 
							fontSize={"sm"}
							as="h4"
							lineHeight="tight"
							w="100%"
							mt={1}
							overflow="hidden"
							textOverflow="ellipsis"
							css={{
								display: "-webkit-box",
								"&": {
									WebkitLineClamp: "2",
									WebkitBoxOrient: "vertical"
								}
							}}
						>
							{description}
						</Box>
					</Flex>

					<Flex alignContent="center">
						<Box 
							display={"flex"}
							fontSize="md" 
							fontWeight={"700"}
							mt={3} 
							justifyContent="space-between"
							w={"100%"}
						>
							<Box as="span" color={"gray.600"} fontSize="md">
                R$
							</Box>
							<Box 
								as="span" 
								color={useColorModeValue("gray.800", "white")} 
								fontSize="md"
							>
								{((price/100).toFixed(2)).replace(".", ",")}
							</Box>
						</Box>
					</Flex>
				</Box>
			</Box>
		</Flex>
	);
}

export default ProductCard;