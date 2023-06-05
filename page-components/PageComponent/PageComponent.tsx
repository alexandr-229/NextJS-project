import { useEffect, useReducer } from "react";
import { Advantages, HTag, Justjoinit, Sort, Tag } from "@/components";
import { PageComponentProps } from "./PageComponent.props";
import styles from "./PageComponent.module.css";
import { TopLevelCategory } from "@/interfaces/page.interface";
import { SortEnum } from "@/components/Sort/Sort.props";
import { SortReducerState, sortReducer } from "./sort.reducer";
import { Product } from "@/components";
import { useReducedMotion } from "framer-motion";

export const PageComponent = ({
	page,
	products,
	firstCategory
}: PageComponentProps) => {
	const initialState: SortReducerState = {
		products,
		sort: SortEnum.Rating
	};
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
		sortReducer,
		initialState
	);
	const shouldReduceMotion = useReducedMotion();

	useEffect(() => {
		dispatchSort({ type: "CHANGE_PRODUCTS", payload: products });
	}, [products]);

	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort });
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<HTag tag="h1">{page.title}</HTag>
				{products && (
					<Tag color="grey" size="large" aria-label={products.length + "items"}>
						{products.length}
					</Tag>
				)}
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div role={"list"}>
				{sortedProducts.map((p) => (
					<Product layout={!shouldReduceMotion} product={p} key={p._id} />
				))}
			</div>
			{firstCategory === TopLevelCategory.Courses && page.justjoinit && (
				<>
					<div className={styles.justjoinitTitle}>
						<HTag tag="h2">Vacancies - {page.category}</HTag>
						<Tag color="red" size="large">
							JustJoinIT
						</Tag>
					</div>
					<Justjoinit {...page.justjoinit} />
				</>
			)}
			{page.advantages && !!page.advantages.length && (
				<>
					<HTag tag="h2">Advanteges</HTag>
					<Advantages advantages={page.advantages} />
				</>
			)}
			<HTag tag="h2">New skills</HTag>
			{page.tags.map((tag) => (
				<Tag key={tag} color="primary" size="large" className={styles.tag}>
					{tag}
				</Tag>
			))}
		</div>
	);
};
