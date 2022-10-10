import {
	Button,
	Flex,
	Input,
	VStack,
	Link
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import authService from "../../services/authService";

export default function LoginForm(){
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isDisabled, setIsDisabled] = useState(false);
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		setIsDisabled(true);
		const userCredentials = {
			email,
			password
		};
		const userToken = await authService.login(userCredentials);
		setIsDisabled(false); 
		if(userToken.status === 200){
			setUser(userToken.data);
			navigate("/products");
		}
	}

	return(
		<Flex flexDirection={"column"} gap={4}>
			<VStack spacing={4} maxW={600} as={"form"} onSubmit={handleSubmit} >
				<Input 
					type="email" 
					placeholder="E-mail"
					onChange={(e) => setEmail(e.target.value)} 
					disabled={isDisabled}
					focusBorderColor="orange.300"
					borderColor="orange.400"
				/>
				<Input 
					type="password" 
					placeholder="Senha"
					onChange={(e) => setPassword(e.target.value)}
					disabled={isDisabled}
					focusBorderColor="orange.300"
					borderColor="orange.400"
				/>
				<Button 
					type="submit"
					isLoading = { isDisabled }
					colorScheme={"orange"}
					w="100%"
					fontSize={"lg"}
					fontFamily={"'Silkscreen', cursive"}
				>
          Entrar
				</Button>
			</VStack>
			<Link
				as={"button"}
				onClick={() => navigate("/signup")}
				disabled={isDisabled}
				background={"none"}
				color={"orange.400"}
				variant="none"
				fontFamily={"'Silkscreen', cursive"}
				fontSize={"sm"}
				textDecoration={"underline"}
				pt={4}
			>
				{"Não tem uma conta? cadastre-se"}
			</Link>
		</Flex>
	);
}