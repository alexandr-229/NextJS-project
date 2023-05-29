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
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<span
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort === SortEnum.Rating
				})}>
				<SortIcon className={styles.sortIcon} />
				By rating
			</span>
			<span
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort === SortEnum.Price
				})}>
				<SortIcon className={styles.sortIcon} />
				By price
			</span>
		</div>
	);
};
