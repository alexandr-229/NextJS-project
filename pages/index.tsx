import { GetStaticProps } from "next";
import axios from "axios";

import { withLayout } from "@/layout/Layout";
import { MenuItem } from "@/interfaces/menu.interface";
import { API } from "@/helpers/api";
import { ProductModel } from "@/interfaces/product.interface";
import { Product } from "@/components";
import styles from "../styles/index.module.css";

function Home({ products }: HomeProps): JSX.Element {
	return (
		<>
			<p className={styles.title}>
				Explore the world of knowledge with our popular courses. Learn new
				skills, grow, and achieve success with us.
			</p>
			<p className={styles.popular}>Popular courses</p>
			{products.map((product) => (
				<Product product={product} key={product._id} />
			))}
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {
	try {
		const firstCategory = 0;
		const { data: menu } = await axios.post<MenuItem[]>(API.page.find, {
			firstCategory
		});
		const { data: products } = await axios.post<ProductModel[]>(
			API.product.popular,
			{ limit: 5 }
		);

		return {
			props: {
				menu,
				firstCategory,
				products
			}
		};
	} catch {
		return {
			notFound: true
		};
	}
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
	products: ProductModel[];
}
