import styles from "./Search.module.css";
import cn from "classnames";
import { SearchProps } from "./Search.props";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useState, KeyboardEvent } from "react";
import GlassIcon from "./glass.svg";
import { useRouter } from "next/router";

export const Search = ({ children, className, ...props }: SearchProps) => {
	const [search, setSearch] = useState<string>("");
	const router = useRouter();

	const goToSearch = () => {
		router.push({
			pathname: "/search",
			query: {
				q: search
			}
		});
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === "Enter") {
			goToSearch();
		}
	};

	return (
		<div className={cn(className, styles.search)} {...props}>
			<Input
				className={styles.input}
				placeholder="Search..."
				value={search}
				onChange={(event) => setSearch(event.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				appearance="primary"
				className={styles.button}
				onClick={goToSearch}>
				<GlassIcon />
			</Button>
		</div>
	);
};
