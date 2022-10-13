import { useToast } from "@chakra-ui/react";

export function CheckoutErrorToast() {
	const toast = useToast();
	return (
		toast({
			title: "Carrinho vazio!",
			description: "Adicione itens ao carrinho para acessar a página de finalizar pedido",
			status: "error",
			duration: 5000,
			isClosable: true,
		})
	);
}