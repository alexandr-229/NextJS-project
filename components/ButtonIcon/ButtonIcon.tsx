import styles from "./ButtonIcon.module.css";
import cn from "classnames";
import { ButtonIconProps } from "./ButtonIcon.props";
import { icons } from "./Button.icons";

export const ButtonIcon = ({
	appearance,
	icon,
	className,
	...props
}: ButtonIconProps): JSX.Element => {
	const IconComponents = icons[icon];

	return (
		<button
			className={cn(styles.button, className, {
				[styles.primary]: appearance === "primary",
				[styles.white]: appearance === "ghost"
			})}
			{...props}>
			<IconComponents />
		</button>
	);
};
