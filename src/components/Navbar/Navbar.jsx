import { Flex } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

export default function Navbar(){
	return(
		<Flex justifyContent={"space-between"} w={"100%"}>
			<ColorModeSwitcher />
			<HamburgerMenu />
		</Flex>
	);
}