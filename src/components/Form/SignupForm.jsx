import {
	Button,
	Input,
	VStack,
	Link,
	Flex
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

export default function SignupForm(){
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isDisabled, setIsDisabled] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		console.log("name: ", name);
		console.log("email: ", email);
		console.log("password: ", password);
		console.log("confirmPassword: ", confirmPassword);
		setIsDisabled(true);
		const userData = {
			name,
			email,
			password,
			confirmPassword
		};
		const response = await authService.signup(userData);
		setIsDisabled(false); 
		console.log("response");
		console.log(response.response.status);
		if(response.status === 201){
			navigate("/login");
		}
	}

	return(
		<Flex flexDirection={"column"} gap={4}>
			<VStack spacing={4} maxW={600} as="form" onSubmit={handleSubmit}>
				<Input 
					type="text" 
					placeholder="name"
					onChange={(e) => setName(e.target.value)} 
					value={name}
					disabled={isDisabled}
					focusBorderColor="orange.300"
					borderColor="orange.400"
					fontFamily={"'Silkscreen', cursive"}
				/>
				<Input 
					type="email" 
					placeholder="E-mail"
					onChange={(e) => setEmail(e.target.value)} 
					value={email}
					disabled={isDisabled}
					focusBorderColor="orange.300"
					borderColor="orange.400"
					fontFamily={"'Silkscreen', cursive"}
				/>
				<Input 
					type="password" 
					placeholder="Senha"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					disabled={isDisabled}
					focusBorderColor="orange.300"
					borderColor="orange.400"
					fontFamily={"'Silkscreen', cursive"}
				/>
				<Input 
					type="password" 
					placeholder="Confirme a Senha"
					onChange={(e) => setConfirmPassword(e.target.value)}
					value={confirmPassword}
					disabled={isDisabled}
					focusBorderColor="orange.300"
					borderColor="orange.400"
					fontFamily={"'Silkscreen', cursive"}
				/>
				<Button 
					type="submit"
					isLoading = { isDisabled }
					colorScheme={"orange"}
					w="100%"
					fontSize={"lg"}
					fontFamily={"'Silkscreen', cursive"}
				>
          Cadastrar
				</Button>
				
			</VStack>
			<Link
				as={"button"}
				onClick={() => navigate("/login")}
				disabled={isDisabled}
				background={"none"}
				color={"orange.400"}
				variant="none"
				fontFamily={"'Silkscreen', cursive"}
				fontSize={"sm"}
				textDecoration={"underline"}
				pt={4}
			>
				{"Já tem uma conta? Faça o login"}
			</Link>
		</Flex>
	);
}