import { TagProps } from "./Tag.props";
import styles from "./Tag.module.css";
import cn from "classnames";

export const Tag = ({
	size = "large",
	children,
	color = "ghost",
	className,
	href,
	...props
}: TagProps): JSX.Element => {
	return (
		<div
			className={cn(styles.tag, className, styles[color], styles[size])}
			{...props}>
			{href ? <a href={href}>{children}</a> : children}
		</div>
	);
};
