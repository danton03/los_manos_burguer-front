import {
	Button,
	Input,
	VStack
} from "@chakra-ui/react";
import { useState } from "react";

export default function LoginForm(){
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isDisabled, setIsDisabled] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		console.log("email: ", email);
		console.log("password: ", password);
		setIsDisabled(true);
	}

	return(
		<form onSubmit={handleSubmit}>
			<VStack spacing={4} maxW={600} >
				<Input 
					type="email" 
					placeholder="E-mail"
					onChange={(e) => setEmail(e.target.value)} 
					disabled={isDisabled}
					focusBorderColor="orange.300"
					borderColor="orange.400"
					fontFamily={"'Silkscreen', cursive"}
				/>
				<Input 
					type="password" 
					placeholder="Senha"
					onChange={(e) => setPassword(e.target.value)}
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
          Entrar
				</Button>
			</VStack>
		</form>
	);
}