import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

export default function PriceBar() {
	const navigate = useNavigate();
	const { cart } = useContext(UserContext);
	const [total, setTotal] = useState(0);
	
	useEffect(() => {
		let valorTotal = 0;
		cart.forEach((product) =>{ 
			const { price, amount } = product;
			valorTotal = valorTotal + (price*amount);
		});
		setTotal(valorTotal);
	},[cart]);
	
	return(
		<Flex 
			className="PriceBar"
			position={"fixed"}
			bottom={0}
			right={0}
			justifyContent={"space-between"}
			alignItems={"center"}
			w={"100%"}
			h={"4.75rem"}
			p={"0 1.25rem"}
			boxSizing={"border-box"}
			zIndex={"1"}
			backgroundColor={"white"}
		>
			<Flex className="total" flexDirection={"column"}>
				<Heading 
					as={"h4"}
					fontSize={"lg"}
					fontFamily={"'Silkscreen', cursive"}
				>
					{"Total"}
				</Heading>
				<Text 
					as={"p"}
					fontSize={"lg"}
					fontWeight={"medium"}
				>
					{`R$ ${((total/100).toFixed(2)).replace(".",",")}`}
				</Text>
			</Flex>
			<Button 
				type="button" 
				onClick={() => navigate("/ckeckout")}
				colorScheme={"orange"}
				fontFamily={"'Silkscreen', cursive"}
			>
				Comprar
			</Button>
		</Flex>
	);
}