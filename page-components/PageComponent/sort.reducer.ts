import { Reducer } from "react";
import { SortEnum } from "@/components/Sort/Sort.props";
import { ProductModel } from "@/interfaces/product.interface";

export type SortActions =
	| { type: SortEnum.Price }
	| { type: SortEnum.Rating }
	| { type: "CHANGE_PRODUCTS"; payload: ProductModel[] };

export interface SortReducerState {
	sort: SortEnum;
	products: ProductModel[];
}

export type SortReducer = (
	state: SortReducerState,
	action: SortActions
) => SortReducerState;

export const sortReducer: Reducer<SortReducerState, SortActions> = (
	state: SortReducerState,
	action: SortActions
): SortReducerState => {
	switch (action.type) {
		case SortEnum.Rating: {
			return {
				sort: SortEnum.Rating,
				products: state.products.sort((a: ProductModel, b: ProductModel) => {
					return (a.reviewAvg || 0) > (b.reviewAvg || 0) ? -1 : 1;
				})
			};
		}
		case SortEnum.Price: {
			return {
				sort: SortEnum.Price,
				products: state.products.sort((a: ProductModel, b: ProductModel) => {
					return a.price > b.price ? -1 : 1;
				})
			};
		}
		case "CHANGE_PRODUCTS": {
			return {
				sort: SortEnum.Rating,
				products: action.payload.sort((a: ProductModel, b: ProductModel) => {
					return (a.reviewAvg || 0) > (b.reviewAvg || 0) ? -1 : 1;
				})
			};
		}
		default: {
			throw new Error("Invaild sort type");
		}
	}
};
