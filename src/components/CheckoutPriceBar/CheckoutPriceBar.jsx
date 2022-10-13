/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Flex, Heading, Text, useColorModeValue, VStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useToast } from "@chakra-ui/react";

export default function CheckoutPriceBar(props) {
	const { cart } = useContext(UserContext);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [totalOfCart, setTotalOfCart] = useState(0);
	const toast = useToast();
	const { 
		deliveryPrice, 
		deliveryOption, 
		selectedCity, 
		selectedDistrict, 
		address, 
		houseNumber,
		name 
	} = props;
	
	useEffect(() => {
		let valorTotal = 0;
		cart.forEach((product) =>{ 
			const { price, amount } = product;
			valorTotal = valorTotal + (price*amount);
		});
		setTotalOfCart(valorTotal);
	},[cart]);

	function calculateTotal() {
		const total = (totalOfCart+deliveryPrice)/100;
		return (total.toFixed(2)).replace(".",",");
	}

	function openModal() {
		const condition = deliveryOption === "Delivery" && (selectedDistrict === "" || address.length < 1 || houseNumber.length < 1 || name.length < 1); 
		if (condition) {
			return InvalidAddressErrorToast();
		}
		return onOpen();
	}

	function InvalidAddressErrorToast() {
		return (
			toast({
				title: "Preencha todos os campos para a entrega",
				description: "",
				position:"top-right",
				status: "error",
				duration: 4000,
				isClosable: true,
			})
		);
	}

	function generateOrder(){
		let hamburgers = "";
		let drinks = "";
		let additional = "";
		cart.forEach((product)=>{
			if (product.category === "Hamburguer") {
				hamburgers += `${product.amount} - ${product.name}\n`;
			}
			else if (product.category === "Bebida") {
				drinks += `${product.amount} - ${product.name}\n`;
			}
			else if (product.category === "Adicional") {
				additional += `${product.amount} - ${product.name}\n`;
			}
		});

		const hamburgersList = hamburgers !== "" ? `\n*Hambúrguer*:\n${hamburgers}`: "";
		const drinksList = drinks !== "" ? `\n*Bebida*:\n${drinks}`: "";
		const additionalList = additional !== "" ? `\n*Adicional*:\n${additional}`: "";
		const productsOfOrder = hamburgersList+drinksList+additionalList;
		const addressToDelivery = deliveryOption === "Delivery" ? `*Endereço*: \n${address}, ${houseNumber}, ${selectedDistrict}, ${selectedCity}\n`: "";
		const deliveryFee = deliveryOption === "Delivery" ? `*Frete*: ${((deliveryPrice/100).toFixed(2)).replace(".",",")}\n`: "";
		const deliveryInformation = addressToDelivery+deliveryFee;
		const order = `Olá, gostaria de fazer o meu pedido:
${productsOfOrder}
*Tipo de entrega*: ${deliveryOption}\n
${deliveryInformation}*Cliente*: ${name}\n
*Total*: ${calculateTotal()}
    `;
		return order;
	}

	function sendOrder() {
		const order = generateOrder();
		const encodedMessage = encodeURIComponent(order);
		window.open(`https://wa.me/5586988660071?text=${encodedMessage}`,"_blank");
	}
	
	return(
		<>
			<Flex 
				className="PriceBar"
				position={"fixed"}
				bottom={0}
				right={0}
				justifyContent={"space-between"}
				alignItems={"center"}
				w={"100%"}
				h={"5.25rem"}
				p={"0 0.75rem"}
				boxSizing={"border-box"}
				backgroundColor={useColorModeValue("orange.50", "gray.900")}
			>
				<VStack>
					<Flex 
						className="subtotal" 
						flexDirection={"row"} 
						gap={2} 
						justifyContent={"flex-start"}
						alignItems={"center"}
						w={"100%"}
					>
						<Heading 
							as={"h4"}
							fontSize={"sm"}
							fontFamily={"'Silkscreen', cursive"}
						>
							{"Subtotal:"}
						</Heading>
						<Text 
							as={"p"}
							fontSize={"md"}
							fontWeight={"medium"}
						>
							{`R$ ${((totalOfCart/100).toFixed(2)).replace(".",",")}`}
						</Text>
					</Flex>
					<Flex 
						className="total" 
						flexDirection={"row"} 
						gap={3} 
						justifyContent={"flex-start"}
						alignItems={"center"}
						w={"100%"}
					>
						<Heading 
							as={"h4"}
							fontSize={"lg"}
							fontFamily={"'Silkscreen', cursive"}
						>
							{"Total:"}
						</Heading>
						<Text 
							as={"p"}
							fontSize={"lg"}
							fontWeight={"medium"}
						>
							{`R$ ${calculateTotal()}`}
						</Text>
					</Flex>
				</VStack>
				<Button 
					type="button" 
					onClick={() => openModal()}
					colorScheme={"orange"}
					fontFamily={"'Silkscreen', cursive"}
				>
          Comprar
				</Button>
			</Flex>

			<Modal isOpen={isOpen} onClose={onClose} isCentered >
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Confirmar Pedido</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{`Ao clicar em "confirmar" você será redirecionado para o WhatsApp com uma mensagem descrevendo o seu pedido. 
              Envie também a sua localização fixa para facilitar a entrega caso tenha escolhido receber por delivery.
              `}
					</ModalBody>
  
					<ModalFooter>
						<Button variant='ghost' mr={3} onClick={onClose}>
                Fechar
						</Button>
						<Button colorScheme="orange" onClick={() => sendOrder()}>Confirmar</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

