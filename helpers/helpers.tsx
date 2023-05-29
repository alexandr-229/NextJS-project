import CoursesIcon from "./icons/courses.svg";
import ServicesIcon from "./icons/services.svg";
import BooksIcon from "./icons/books.svg";
import ProductsIcon from "./icons/products.svg";
import { FirstLevelMenuItem } from "@/interfaces/menu.interface";
import { TopLevelCategory } from "@/interfaces/page.interface";

export const firstLevelMenu: FirstLevelMenuItem[] = [
	{
		route: "courses",
		name: "Courses",
		icon: <CoursesIcon />,
		_id: TopLevelCategory.Courses
	},
	{
		route: "services",
		name: "Services",
		icon: <ServicesIcon />,
		_id: TopLevelCategory.Services
	},
	{
		route: "books",
		name: "Books",
		icon: <BooksIcon />,
		_id: TopLevelCategory.Books
	},
	{
		route: "products",
		name: "Products",
		icon: <ProductsIcon />,
		_id: TopLevelCategory.Products
	}
];

export const priceEn = (price: number): string =>
	price
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
		.concat(" $");

export const devlOfNumber = (
	number: number,
	title: [string, string]
): string => {
	return title[number === 1 ? 0 : 1];
};
