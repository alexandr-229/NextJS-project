export const API = {
	page: {
		find: `${process.env.NEXT_PUBLIC_DOMAIN}/api/page/find`,
		byAlias: `${process.env.NEXT_PUBLIC_DOMAIN}/api/page/byAlias/`
	},
	product: {
		find: `${process.env.NEXT_PUBLIC_DOMAIN}/api/product/find`,
		popular: `${process.env.NEXT_PUBLIC_DOMAIN}/api/product/popular`,
	},
	review: {
		create: `${process.env.NEXT_PUBLIC_DOMAIN}/api/review/create`
	}
};
