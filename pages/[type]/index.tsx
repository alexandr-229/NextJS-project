import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import axios from "axios";

import { withLayout } from "@/layout/Layout";
import { MenuItem } from "@/interfaces/menu.interface";
import { firstLevelMenu } from "@/helpers/helpers";
import { ParsedUrlQuery } from "querystring";
import { TopLevelCategory } from "@/interfaces/page.interface";
import { API } from "@/helpers/api";

function Type({ firstCategory }: TypeProps): JSX.Element {
	return <>Type: {firstCategory}</>;
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: firstLevelMenu.map((m) => `/${m.route}`),
		fallback: true
	};
};

export const getStaticProps: GetStaticProps = async ({
	params
}: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true
		};
	}
	const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type);
	if (!firstCategoryItem) {
		return {
			notFound: true
		};
	}
	const { data: menu } = await axios.post<MenuItem[]>(API.page.find, {
		firstCategory: firstCategoryItem._id
	});

	return {
		props: {
			menu,
			firstCategory: firstCategoryItem._id
		}
	};
};

interface TypeProps {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
}
