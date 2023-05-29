import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import axios from "axios";

import { withLayout } from "@/layout/Layout";
import { MenuItem } from "@/interfaces/menu.interface";
import { PageModel, TopLevelCategory } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/product.interface";
import { firstLevelMenu } from "@/helpers/helpers";
import { PageComponent } from "@/page-components";
import { API } from "@/helpers/api";

function Page({ page, products, firstCategory }: PageProps): JSX.Element {
	if (!page) {
		return <></>;
	}
	return (
		<PageComponent
			firstCategory={firstCategory}
			page={page}
			products={products}
		/>
	);
}

export default withLayout(Page);

export const getStaticPaths: GetStaticPaths = async () => {
	const paths: string[] = [];
	for (const m of firstLevelMenu) {
		const { data: menu } = await axios.post<MenuItem[]>(API.page.find, {
			firstCategory: m._id
		});
		const newPaths = menu.flatMap((s) => {
			return s.pages.map((p) => `/${m.route}/${p.alias}`);
		});
		paths.push(...newPaths);
	}
	return {
		paths,
		fallback: true
	};
};

export const getStaticProps: GetStaticProps = async ({
	params
}: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params || !params.type || !params.alias) {
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

	try {
		const { data: menu } = await axios.post<MenuItem[]>(API.page.find, {
			firstCategory: firstCategoryItem._id
		});
		if (!menu.length) {
			return {
				notFound: true
			};
		}
		const { data: page } = await axios.get<PageModel>(
			API.page.byAlias + params.alias
		);
		const { data: products } = await axios.post<ProductModel[]>(
			API.product.find,
			{ category: page.category, limit: 10 }
		);
		return {
			props: {
				menu,
				page,
				firstCategory: firstCategoryItem._id,
				products
			}
		};
	} catch {
		return {
			notFound: true
		};
	}
};

interface PageProps extends Record<string, unknown> {
	menu: MenuItem[];
	page: PageModel;
	firstCategory: TopLevelCategory;
	products: ProductModel[];
}
