import cn from "classnames";
import { Menu } from "../Menu/Menu";
import { SidebarProps } from "./Sidebar.props";
import Logo from "../logo.svg";
import styles from "./Sidebar.module.css";
import { Search } from "@/components";

export const Sidebar = ({ className, ...props }: SidebarProps) => {
	return (
		<div className={cn(styles.sidebar, className)} {...props}>
			<Logo className={styles.logo} />
			<Search />
			<Menu />
		</div>
	);
};
