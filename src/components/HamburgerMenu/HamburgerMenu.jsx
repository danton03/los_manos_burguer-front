import { 
	Button, 
	Drawer, 
	DrawerBody, 
	DrawerCloseButton, 
	DrawerContent, 
	DrawerHeader, 
	DrawerOverlay, 
	useDisclosure,
	VStack
} from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

export default function HamburgerMenu(){
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { user } = useContext(UserContext);
	const navigate = useNavigate();
	return(
		<>
			<Button
				type="button"
				onClick={onOpen}
				w={"fit-content"}
				padding={0}
				background={"none"}
				variant="ghost" 
				color={"orange.400"}
				colorScheme={"orange"}
			>
				<ion-icon name="menu" stlyle={{color: "orange"}} size="large"></ion-icon>
			</Button>
			<Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader 
						borderBottomWidth="1px" 
						fontFamily={"'Silkscreen', cursive"} 
						color={"orange.400"}
					>
						Menu
					</DrawerHeader>
					<DrawerBody>
						<VStack spacing={2}>
							<Button
								type="button"
								background={"none"}
								color={"orange.400"}
								colorScheme={"orange"}
								variant="ghost"
								fontFamily={"'Silkscreen', cursive"}
								w={"100%"}
								onClick={() => navigate("/")}
							>
								Home
							</Button>
							{ user ? 
								null 
								:<> 
									<Button 
										type="button"
										background={"none"}
										color={"orange.400"}
										colorScheme={"orange"}
										variant="ghost"
										fontFamily={"'Silkscreen', cursive"}
										w={"100%"}
										onClick={() => navigate("/login")}
									>
										Login
									</Button>

									<Button
										type="button"
										background={"none"}
										color={"orange.400"}
										colorScheme={"orange"}
										variant="ghost"
										fontFamily={"'Silkscreen', cursive"}
										w={"100%"}
										onClick={() => navigate("/signup")}
									>
										Cadastrar-se
									</Button>
								</>
							}
						</VStack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}
