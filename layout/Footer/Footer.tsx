import cn from "classnames";
import { format } from "date-fns";

import styles from "./Footer.module.css";
import { FooterProps } from "./Footer.props";

export const Footer = ({ className, ...props }: FooterProps) => {
	return (
		<footer {...props} className={cn(className, styles.footer)}>
			<div>Next Project © 2022 - {format(new Date(), "yyyy")}</div>
			<a href="/" target="_blank">
			Terms of use
			</a>
			<a href="/" target="_blank">
			Privacy Policy
			</a>
		</footer>
	);
};
