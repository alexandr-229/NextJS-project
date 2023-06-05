import { HeaderProps } from "./Header.props";
import cn from "classnames";
import styles from "./Header.module.css";
import Logo from "../logo.svg";
import { ButtonIcon } from "@/components";
import { motion, useReducedMotion } from "framer-motion";
import { Sidebar } from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const Header = ({ className, ...props }: HeaderProps) => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const router = useRouter();
	const shouldReduceMotion = useReducedMotion();

	useEffect(() => {
		setIsOpened(false);
	}, [router]);

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffness: 20
			}
		},
		closed: {
			opacity: +!shouldReduceMotion,
			x: "100%"
		}
	};

	return (
		<header className={cn(className, styles.header)} {...props}>
			<Logo />
			<ButtonIcon
				appearance="ghost"
				icon="menu"
				onClick={() => setIsOpened(true)}
			/>
			<motion.div
				className={styles.mobileMenu}
				variants={variants}
				initial="close"
				animate={isOpened ? "opened" : "closed"}>
				<Sidebar />
				<ButtonIcon
					className={styles.menuClose}
					appearance="ghost"
					icon="close"
					onClick={() => setIsOpened(false)}
				/>
			</motion.div>
		</header>
	);
};
