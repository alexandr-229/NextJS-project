import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import { useScrollY } from "@/hooks/useScrollY";
import styles from "./Up.module.css";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";

export const Up = () => {
	const scrollY = useScrollY();
	const controll = useAnimation();

	useEffect(() => {
		controll.start({ opacity: scrollY / document.body.scrollHeight });
	}, [scrollY, controll]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	return (
		<motion.div
			animate={controll}
			className={styles.up}
			initial={{ opacity: 0 }}>
			<ButtonIcon
				appearance="primary"
				icon="up"
				onClick={scrollToTop}
				aria-label="Up"
			/>
		</motion.div>
	);
};
