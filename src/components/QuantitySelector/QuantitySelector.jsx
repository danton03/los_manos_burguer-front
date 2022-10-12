/* eslint-disable react/prop-types */
import { Box, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

export default function QuantitySelector(props) {
	const {cart, setCart, productId, amount} = props;
	const [counter, setCounter] = useState(amount);

	function increment() {
		const newCart = cart.map((item) => {
			if(item.id === productId){
				setCounter(counter+1);
				return {...item, amount: item.amount + 1};
			}
			return item;
		});
		setCart(newCart);
	}

	function decrement() {
		if(counter > 1){
			const newCart = cart.map((item) => {
				if(item.id === productId){
					setCounter(counter-1);
					return {...item, amount: item.amount - 1};
				}
				return item;
			});
			setCart(newCart);
		}
	}

	return(
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
				fontSize={"md"}
				p={0}
				w={"fit-content"}
			>
         - 
			</Button>
			<Box 
				as={"span"} 
				display={"flex"}
				alignItems={"center"}
				justifyContent={"center"}
				fontSize={"lg"}
			>
				{counter}
			</Box>
			<Button 
				type="button"
				onClick={increment}
				colorScheme={"orange"}
				fontSize={"md"}
			>
        + 
			</Button>
		</Flex>
	);
}