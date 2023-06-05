import { useContext, KeyboardEvent, useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import Link from "next/link";
import styles from "./Menu.module.css";
import { AppContext } from "@/context/app.context";
import { firstLevelMenu } from "@/helpers/helpers";
import { motion, useReducedMotion } from "framer-motion";
import {
	FirstLevelMenuItem,
	MenuItem,
	PageItem
} from "@/interfaces/menu.interface";

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const [announce, setAnnounce] = useState<"closed" | "opened" | undefined>();
	const router = useRouter();
	const shouldReduceMotion = useReducedMotion();

	const variants = {
		visible: {
			transition: shouldReduceMotion
				? {}
				: {
						when: "beforeChildren",
						staggerChildren: 0.05
				  },
			marginBottom: 10
		},
		hidden: {
			marginBottom: 0
		}
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 29
		},
		hidden: {
			opacity: +!shouldReduceMotion,
			height: 0
		}
	};

	const openSecondLevel = (secondCategory: string) => {
		setMenu &&
			setMenu(
				menu.map((m) => {
					if (m._id.secondCategory === secondCategory) {
						setAnnounce(m.isOpened ? "closed" : "opened");
						m.isOpened = !m.isOpened;
					}
					return m;
				})
			);
	};

	const openSecondLevelKey = (event: KeyboardEvent, secondCategory: string) => {
		if (event.code === "Space" || event.code === "Enter") {
			event.preventDefault();
			openSecondLevel(secondCategory);
		}
	};

	const buildFirstLevel = (): JSX.Element => {
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map((menu: FirstLevelMenuItem) => (
					<li key={menu.route} aria-expanded={menu._id === firstCategory}>
						<div
							tabIndex={0}
							className={cn(styles.firstLevel, {
								[styles.firstLevelActive]: menu._id === firstCategory
							})}>
							{menu.icon}
							<span>{menu.name}</span>
						</div>
						{menu._id === firstCategory && buildSecondLevel(menu)}
					</li>
				))}
			</ul>
		);
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map((item: MenuItem) => {
					const alias =
						typeof router.query.alias === "string" ? router.query.alias : "";
					const aliases = item.pages.map((page) => page.alias);
					if (aliases.includes(alias)) {
						item.isOpened = true;
					}
					return (
						<li key={item._id.secondCategory}>
							<button
								aria-expanded={item.isOpened}
								onKeyDown={(event: KeyboardEvent) =>
									openSecondLevelKey(event, item._id.secondCategory)
								}
								className={styles.secondLevel}
								onClick={() => openSecondLevel(item._id.secondCategory)}>
								{item._id.secondCategory}
							</button>
							<motion.ul
								layout
								variants={variants}
								initial={item.isOpened ? "visible" : "hidden"}
								animate={item.isOpened ? "visible" : "hidden"}
								className={cn(styles.secondLevelBlock)}>
								{buildThirdLevel(
									item.pages,
									menuItem.route,
									item.isOpened || false
								)}
							</motion.ul>
						</li>
					);
				})}
			</ul>
		);
	};

	const buildThirdLevel = (
		pages: PageItem[],
		route: string,
		isOpened: boolean
	): JSX.Element[] => {
		return pages.map((p) => (
			<motion.li variants={variantsChildren} key={p.alias}>
				<Link
					aria-current={
						`/${route}/${p.alias}` === router.asPath ? "page" : false
					}
					tabIndex={isOpened ? 0 : -1}
					href={`/${route}/${p.alias}`}
					className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
					})}>
					{p.category}
				</Link>
			</motion.li>
		));
	};

	return (
		<nav className={styles.menu} role="navigation">
			{announce && (
				<span className={styles.visualyHidden}>
					{announce === "opened" ? "Deployed" : "Collapsed"}
				</span>
			)}
			{buildFirstLevel()}
		</nav>
	);
};
