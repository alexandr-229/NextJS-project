import styles from "./P.module.css";
import cn from "classnames";
import { PProps } from "./P.props";

export const P = ({
	size = "medium",
	children,
	className,
	...props
}: PProps) => {
	return (
		<p
			{...props}
			className={cn(styles.p, className, {
				[styles.small]: size === "small",
				[styles.large]: size === "large"
			})}>
			{children}
		</p>
	);
};
