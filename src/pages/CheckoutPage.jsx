/* eslint-disable no-inner-declarations */
import { Center, Flex, Heading, Input, Radio, RadioGroup, Select, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import deliveryService from "../services/deliveryLocationsService";
import UserContext from "../contexts/UserContext";
import CheckoutPriceBar from "../components/CheckoutPriceBar/CheckoutPriceBar";

export default function CheckoutPage() {
	const [deliveryOption, setDeliveryOption] = useState("Delivery");
	const { user, cart } = useContext(UserContext);
	const [locations, setLocations] = useState();
	const [selectedCity, setSelectedCity] = useState("");
	const [selectedDistrict, setSelectedDistrict] = useState("");
	const [address, setAddress] = useState("");
	const [houseNumber, setHouseNumber] = useState("");
	const [name, setName] = useState("");
	// console.log("selectedDistrict", selectedDistrict);


	useEffect(() => {
		setTimeout(getLocations, 60);
	}, []);

	function getLocations() {
		//console.log(locations);
		if(user.token){
			async function getUserData() {
				const locationsData = await deliveryService.getLocationsWithUserAddresses(user.token);
				setLocations(locationsData.deliveryLocations);
			}
			getUserData();
		}
		else{
			async function getUserData() {
				const locationsData = await deliveryService.getLocations();
				setLocations(locationsData);
			}
			getUserData();
		}
	}

	function renderOrderResume(){
		const hamburgers = cart.filter((product)=>product.category === "Hamburguer");
		const drinks = cart.filter((product)=>product.category === "Bebida");
		const additional = cart.filter((product)=>product.category === "Adicional");

		return(
			<Flex flexDirection={"column"} gap={"0.75rem"}>
				{hamburgers.length?
					<>
						<Heading
							as={"h3"} 
							fontSize={"md"} 
							fontWeight={"bold"}
							alignSelf={"flex-start"}
						>
          Hamburguer:
						</Heading>
						<Flex flexDirection={"column"}>
							{
								hamburgers.map((hamburger)=> {
									return <Text key={hamburger.id}>{`${hamburger.amount}x - ${hamburger.name}`}</Text>;
								})
							}
						</Flex>
					</> 
					: null
				}

				{drinks.length?
					<>
						<Heading
							as={"h3"} 
							fontSize={"md"} 
							fontWeight={"bold"}
							alignSelf={"flex-start"}
						>
            Bebida:
						</Heading>
						<Flex flexDirection={"column"}>
							{
								drinks.map((drink)=> {
									return <Text key={drink.id}>{`${drink.amount}x - ${drink.name}`}</Text>;
								})
							}
						</Flex>
					</>
					: null
				}

				{additional.length?
					<>
						<Heading
							as={"h3"} 
							fontSize={"md"} 
							fontWeight={"bold"}
							alignSelf={"flex-start"}
						>
              Adicional:
						</Heading>
						<Flex flexDirection={"column"}>
							{
								additional.map((additional)=> {
									return <Text key={additional.id}>{`${additional.amount}x - ${additional.name}`}</Text>;
								})
							}
						</Flex>
					</>
					: null
				}
			</Flex>
		);
	}

	function renderDistricts(){
		if(selectedCity !== ""){
			const cityInformation = locations.find((city) => city.name === selectedCity);
			const districts = cityInformation.Districts;
			console.log(districts);
			return(
				districts.map((district) => {
					console.log(district);
					return (
						<option 
							key={district.id} 
							value={district.name}
						>
							{district.name}
						</option>
					);
				})
			);
		}
	}

	function returnDeliveryPrice() {
		if(selectedCity !== "" && selectedDistrict !== ""){
			const districts = locations.find((city) => city.name === selectedCity).Districts;
			const district = districts.find(district => district.name === selectedDistrict);
			return district.Delivery.price;
		}
		return 0;
	}
  
	return(
		<Flex flexDirection={"column"} boxSizing={"border-box"}>
			<VStack minH="100vh" padding={3} boxSizing={"border-box"} spacing={5}>
				<Navbar />
				{locations ?
					<VStack spacing={5} boxSizing={"border-box"} pb={"6rem"} width="100%">
						<Heading 
							fontSize={"lg"} 
							fontFamily={"'Silkscreen', cursive"}
							alignSelf={"flex-start"}
							pb={6}
						>
            Finalizar o pedido
						</Heading>

						<Flex width={"100%"} flexDirection={"column"} gap={"0.75rem"}>
							<Heading
								as={"h3"} 
								fontSize={"md"} 
								fontFamily={"'Silkscreen', cursive"}
								alignSelf={"flex-start"}
							>
                Resumo do pedido
							</Heading>

							{ renderOrderResume() }
						</Flex>
						<Heading
							as={"h3"} 
							fontSize={"md"} 
							fontFamily={"'Silkscreen', cursive"}
							alignSelf={"flex-start"}
							pt={3}
						>
              Como deseja receber o pedido?
						</Heading>
						<RadioGroup 
							onChange={setDeliveryOption} 
							value={deliveryOption} 
							width={"100%"}
							colorScheme={"orange"}
						>
							<Stack direction="column">
								<Radio value="Delivery">Delivery</Radio>
								<Radio value="Retirada no local">Retirar no local</Radio>
							</Stack>
						</RadioGroup>
						{
							deliveryOption === "Delivery" ?
								<>
									<Select 
										placeholder='Selecione a cidade'
										value={selectedCity}
										onChange={e => {setSelectedCity(e.target.value); setSelectedDistrict("");}}
										w={"100%"}
										maxW={"37.5rem"}
										alignSelf={"flex-start"}
										focusBorderColor={"orange.400"}
									>
										{
											locations.map((city) => {
												return (
													<option 
														key={city.id} 
														value={city.name}
													>
														{city.name}
													</option>
												);
											})
										}
									</Select>

									{
										selectedCity !== "" ?
											<Select 
												placeholder='Selecione a cidade'
												value={selectedDistrict}
												onChange={e => setSelectedDistrict(e.target.value)}
												w={"100%"}
												maxW={"37.5rem"}
												alignSelf={"flex-start"}
												focusBorderColor={"orange.400"}
											>
												{
													renderDistricts()
												}
											</Select>
											: null
									}
								</>
								:null 
						}

						{
							selectedCity !== "" && selectedDistrict !== ""  && deliveryOption === "Delivery"?
								<>
									<Stack 
										as={"form"} 
										flexDirection={"column"} 
										spacing={4} 
										onSubmit={e => e.preventDefault()}
										w={"100%"}
										maxW={"37.5rem"}
										alignSelf={"flex-start"}
									>
										<Input 
											type="text" 
											placeholder="Endereço (rua, condomínio/edifício...)"
											value={address}
											onChange={e => setAddress(e.target.value)}
											focusBorderColor={"orange.400"} 
											required
										/>
										<Input 
											type="number" 
											placeholder="Número da casa/apartamento"
											value={houseNumber}
											onChange={e => setHouseNumber(e.target.value)} 
											focusBorderColor={"orange.400"} 
											required
										/>
										
									</Stack>
								</> 
								: null
						}
						
						<VStack spacing={3} pt={2} w={"100%"} alignItems={"flex-start"}>
							<Input 
								type="text" 
								placeholder="Digite o seu nome"
								value={name}
								onChange={e => setName(e.target.value)} 
								focusBorderColor={"orange.400"}
								maxW={"37.5rem"}
							/>
							{selectedCity !== "" && selectedDistrict !== ""  && deliveryOption === "Delivery"?
								<>
									<Heading
										as={"h3"} 
										fontSize={"md"} 
										fontFamily={"'Silkscreen', cursive"}
										alignSelf={"flex-start"}
									>
                    Valor da entrega:
									</Heading>
									<Text 
										as={"p"}
										fontSize={"lg"}
										fontWeight={"medium"}
									>
										{`R$ ${((returnDeliveryPrice()/100).toFixed(2)).replace(".",",")}`}
									</Text>
								</>
								:null
							}
						</VStack>
						<CheckoutPriceBar 
							deliveryPrice={ selectedDistrict !== "" ? returnDeliveryPrice() : 0 } 
							deliveryOption={deliveryOption} 
							selectedCity={selectedCity} 
							selectedDistrict={selectedDistrict} 
							address={address} 
							houseNumber={houseNumber}
							name={name}
						/>
					</VStack>
					:
					<Center minH="80vh"><Spinner color='orange.400' size={"xl"} /></Center>
				}
			</VStack>
		</Flex>
	);
}