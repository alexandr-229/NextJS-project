import styles from "./Layout.module.css";
import cn from "classnames";
import { LayoutProps } from "./Layout.props";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";
import { FunctionComponent, useState, KeyboardEvent, useRef } from "react";
import { AppContextProvider, IAppContext } from "@/context/app.context";
import { Up } from "@/components";

const Layout = ({ children }: LayoutProps) => {
	const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] =
		useState<boolean>(false);
	const bodyRef = useRef<HTMLDivElement>(null);

	const skipContentAction = (event: KeyboardEvent) => {
		if (event.code === "Space" || event.code === "Enter") {
			event.preventDefault();
			bodyRef.current?.focus();
		}
		setIsSkipLinkDisplayed(false);
	};

	return (
		<div className={styles.wrapper}>
			<a
				onFocus={() => setIsSkipLinkDisplayed(true)}
				onKeyDown={skipContentAction}
				tabIndex={0}
				className={cn(styles.skipLink, {
					[styles.displayed]: isSkipLinkDisplayed
				})}>
				Go straight to content
			</a>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<main className={styles.body} ref={bodyRef} tabIndex={0} role="main">
				{children}
			</main>
			<Footer className={styles.footer} />
			<Up />
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
	Component: FunctionComponent<T>
) => {
	return (props: T): JSX.Element => (
		<AppContextProvider firstCategory={props.firstCategory} menu={props.menu}>
			<Layout>
				<Component {...props} />
			</Layout>
		</AppContextProvider>
	);
};
