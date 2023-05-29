import styles from "./Devider.module.css";
import cn from "classnames";
import { DeviderProps } from "./Devider.props";

export const Devider = ({
	children,
	className,
	...props
}: DeviderProps) => {
	return (
		<hr className={cn(className, styles.hr)} {...props} />
	);
};
