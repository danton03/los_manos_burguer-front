import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

export default function Navbar(){
	const navigate = useNavigate();
	return(
		<Flex justifyContent={"space-between"} w={"100%"} alignItems={"flex-start"}>
			<ColorModeSwitcher />
			<Flex 
				gap={3} 
				alignItems={"center"} 
				justifyContent={"center"}
			>
				<Button type="button"
					onClick={() => navigate("/cart")}
					padding={0}
					background={"none"}
					variant="ghost" 
					color={"orange.400"}
					colorScheme={"orange"}
					w={6}
				>
					<ion-icon name="cart-outline" size={"large"} />
				</Button>
				<HamburgerMenu />
			</Flex>
		</Flex>
	);
}