import { PageModel, TopLevelCategory } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/product.interface";

export interface PageComponentProps {
	page: PageModel;
	firstCategory: TopLevelCategory;
	products: ProductModel[];
}
