import { KeyboardEvent } from "react";
import styles from "./Sort.module.css";
import cn from "classnames";
import SortIcon from "./Sort.svg";
import { SortEnum, SortProps } from "./Sort.props";

export const Sort = ({
	children,
	className,
	sort,
	setSort,
	...props
}: SortProps) => {
	const setSortKeydown = (event: KeyboardEvent, sort: SortEnum) => {
		if (event.code === "Enter" || event.code === "Space") {
			event.preventDefault();
			setSort(sort);
		}
	};

	return (
		<div className={cn(styles.sort, className)} {...props}>
			<div className={styles.sortName} id="sort">
				Sorting
			</div>
			<button
				id="rating"
				onKeyDown={(event: KeyboardEvent) =>
					setSortKeydown(event, SortEnum.Rating)
				}
				onClick={() => setSort(SortEnum.Rating)}
				aria-selected={sort === SortEnum.Rating}
				aria-labelledby="sort rating"
				className={cn({
					[styles.active]: sort === SortEnum.Rating
				})}>
				<SortIcon className={styles.sortIcon} />
				By rating
			</button>
			<button
				id="price"
				onKeyDown={(event: KeyboardEvent) =>
					setSortKeydown(event, SortEnum.Price)
				}
				onClick={() => setSort(SortEnum.Price)}
				aria-selected={sort === SortEnum.Price}
				aria-labelledby="sort price"
				className={cn({
					[styles.active]: sort === SortEnum.Price
				})}>
				<SortIcon className={styles.sortIcon} />
				By price
			</button>
		</div>
	);
};
