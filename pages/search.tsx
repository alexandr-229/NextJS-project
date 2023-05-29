import { GetStaticProps } from "next";
import axios from "axios";

import { withLayout } from "@/layout/Layout";
import { MenuItem } from "@/interfaces/menu.interface";
import { API } from "@/helpers/api";

function Search(): JSX.Element {
	return <>Search</>;
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps = async () => {
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
};
