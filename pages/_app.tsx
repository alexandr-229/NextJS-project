import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({
	Component,
	pageProps,
	router
}: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>Next Project</title>
				<meta
					property="og:description"
					content="Pet project. Source code: https://github.com/alexandr-229/NextJS-project"
				/>
				<meta
					property="og:url"
					content={`https://nextjs-project-jloo.onrender.com/${router.asPath}`}
				/>
				<meta property="og:locale" content="en_EN" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}
