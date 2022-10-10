/* eslint-disable react/prop-types */
import { Box, Flex } from "@chakra-ui/react";
import ProductCard from "../ProductCard/ProductCard";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ 
				...style, 
				display: "flex", 
				alignItems: "center", 
				justifyContent: "center",
				boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px", 
				backgroundColor: "orange", 
				borderRadius: "100%", 
			}}
			onClick={onClick}
		/>
	);
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ 
				...style, 
				display: "flex", 
				alignItems: "center", 
				justifyContent: "center",
				boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px", 
				backgroundColor: "orange", 
				borderRadius: "100%", 
			}}
			onClick={onClick}
		/>
	);
}

const settings = { 
	dots: false,
	infinite: false,
	speed: 500,
	centerMode: false,
	variableWidth: true,
	slidesToShow: 4,
	slidesToScroll: 4,
	nextArrow: <SampleNextArrow />,
	prevArrow: <SamplePrevArrow />,
	initialSlide: 0,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: false,
				dots: false
			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				initialSlide: 2
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		}
	]
};

export default function Carousel({ products }) {
	return (
		<Flex w={"85vw"} maxW={"90vw"} p={3} boxSizing={"border-box"} justifyContent={"center"} alignSelf={"flex-start"}>
			<Box minW={"80vw"}>
				<Slider {...settings}>
					{products.map((product) => {
						const {id, name, imageUrl, description, price} = product;
						return (
							<ProductCard 
								key={id} 
								id={id} 
								name={name} 
								imageUrl={imageUrl}
								description={description} 
								price={price} 
							/>
						);
					})}
				</Slider>
			</Box>
		</Flex>
	);
}