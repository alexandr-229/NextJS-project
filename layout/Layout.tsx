import styles from "./Layout.module.css";
import { LayoutProps } from "./Layout.props";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";
import { FunctionComponent } from "react";
import { AppContextProvider, IAppContext } from "@/context/app.context";
import { Up } from "@/components";

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className={styles.wrapper}>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<div className={styles.body}>{children}</div>
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
