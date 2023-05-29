import { GetStaticProps } from "next";
import { useState } from "react";
import axios from "axios";

import { Button, HTag, Rating } from "@/components";
import { withLayout } from "@/layout/Layout";
import { MenuItem } from "@/interfaces/menu.interface";
import { Input, Textarea } from "@/components";
import { API } from "@/helpers/api";

function Home({ menu }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<>
			<HTag tag="h1">Hello</HTag>
			<Button appearance="primary">+</Button>
			<Button appearance="ghost">-</Button>
			<Rating rating={rating} isEditable={true} setRating={setRating} />
			<ul>
				{menu.map((item) => (
					<li key={item._id.secondCategory}>{item._id.secondCategory}</li>
				))}
			</ul>
			<Input />
			<Textarea />
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

		return {
			props: {
				menu,
				firstCategory
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
}
