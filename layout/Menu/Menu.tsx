import { useContext } from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import Link from "next/link";
import styles from "./Menu.module.css";
import { AppContext } from "@/context/app.context";
import { firstLevelMenu } from "@/helpers/helpers";
import { motion } from "framer-motion";
import {
	FirstLevelMenuItem,
	MenuItem,
	PageItem
} from "@/interfaces/menu.interface";

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const router = useRouter();

	const variants = {
		visible: {
			transition: {
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
			opacity: 0,
			height: 0
		}
	};

	const openSecondLevel = (secondCategory: string) => {
		setMenu &&
			setMenu(
				menu.map((m) => {
					if (m._id.secondCategory === secondCategory) {
						m.isOpened = !m.isOpened;
					}
					return m;
				})
			);
	};

	const buildFirstLevel = (): JSX.Element => {
		return (
			<>
				{firstLevelMenu.map((menu: FirstLevelMenuItem) => (
					<div key={menu.route}>
						<div
							className={cn(styles.firstLevel, {
								[styles.firstLevelActive]: menu._id === firstCategory
							})}>
							{menu.icon}
							<span>{menu.name}</span>
						</div>
						{menu._id === firstCategory && buildSecondLevel(menu)}
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
		return (
			<div className={styles.secondBlock}>
				{menu.map((item: MenuItem) => {
					const alias =
						typeof router.query.alias === "string" ? router.query.alias : "";
					const aliases = item.pages.map((page) => page.alias);
					if (aliases.includes(alias)) {
						item.isOpened = true;
					}
					return (
						<div key={item._id.secondCategory}>
							<div
								className={styles.secondLevel}
								onClick={() => openSecondLevel(item._id.secondCategory)}>
								{item._id.secondCategory}
							</div>
							<motion.div
								layout
								variants={variants}
								initial={item.isOpened ? "visible" : "hidden"}
								animate={item.isOpened ? "visible" : "hidden"}
								className={cn(styles.secondLevelBlock)}>
								{buildThirdLevel(item.pages, menuItem.route)}
							</motion.div>
						</div>
					);
				})}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string): JSX.Element[] => {
		return pages.map((p) => (
			<motion.div variants={variantsChildren}>
				<Link
					key={p.alias}
					href={`/${route}/${p.alias}`}
					className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
					})}>
					{p.category}
				</Link>
			</motion.div>
		));
	};

	return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
