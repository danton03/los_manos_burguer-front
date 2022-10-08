import { Flex } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

export default function Navbar(){
	return(
		<Flex justifyContent={"space-between"}>
			<ColorModeSwitcher />
			<HamburgerMenu />
		</Flex>
	);
}