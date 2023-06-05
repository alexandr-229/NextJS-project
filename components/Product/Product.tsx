import { ForwardedRef, forwardRef, useRef, useState } from "react";
import styles from "./Product.module.css";
import { ProductProps } from "./Product.props";
import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { devlOfNumber, priceEn } from "@/helpers/helpers";
import { Devider } from "../Devider/Devider";
import { Review, ReviewForm } from "@/components";
import Image from "next/image";
import { motion } from "framer-motion";

export const Product = motion(
	forwardRef(
		(
			{ product, ...props }: ProductProps,
			ref: ForwardedRef<HTMLDivElement>
		) => {
			const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
			const reviewRef = useRef<HTMLDivElement>(null);

			const scrollToReview = () => {
				setIsReviewOpened(true);
				reviewRef.current?.scrollIntoView({
					behavior: "smooth",
					block: "start"
				});
				reviewRef.current?.focus();
			};

			const variants = {
				hidden: {
					height: 0,
					opacity: 0,
					overflow: "hidden"
				},
				visible: {
					height: "auto",
					opacity: 1
				}
			};

			return (
				<div {...props} ref={ref} role={"listitem"}>
					<Card className={styles.product}>
						<div className={styles.logo}>
							<Image
								src="https://play-lh.googleusercontent.com/Dh6WerD8wLUxaDTFSenKL0VW3pNniJ7lEQYwMoZuHPS-ooRvcTS2H6XIdh0w65nQFCXZ"
								alt=""
								width={70}
								height={70}
							/>
						</div>
						<div className={styles.title}>{product.title}</div>
						<div className={styles.price}>
							<span>
								<span className={styles.visualyHidden}>Price</span>
								{priceEn(product.price)}
							</span>
							{product.oldPrice && (
								<Tag className={styles.oldPrice} color="green">
									<span className={styles.visualyHidden}>Discount</span>
									{priceEn(product.price - product.oldPrice)}
								</Tag>
							)}
						</div>
						<div className={styles.credit}>
							<span className={styles.visualyHidden}>Credit</span>
							{priceEn(product.credit)}/
							<span className={styles.month}>Months</span>
						</div>
						<div className={styles.rating}>
							<span className={styles.visualyHidden}>
								Rating {product.reviewAvg || 0}
							</span>
							<Rating rating={product.reviewAvg || 0} />
						</div>
						<div className={styles.tags}>
							{product.categories.map((category) => (
								<Tag color="ghost" key={category} className={styles.category}>
									{category}
								</Tag>
							))}
						</div>
						<div className={styles.priceTitle} aria-hidden={true}>
							Price
						</div>
						<div className={styles.creditTitle} aria-hidden={true}>
							Credit
						</div>
						<div className={styles.rateTitle}>
							<a href="#ref" onClick={scrollToReview}>
								{product.reviewCount}{" "}
								{devlOfNumber(product.reviewCount, ["review", "reviews"])}
							</a>
						</div>
						<Devider className={styles.firstHr} />
						<div className={styles.description}>{product.description}</div>
						<div className={styles.feature}>
							{product.characteristics.map((characteristic) => (
								<div
									className={styles.characteristic}
									key={characteristic.name}>
									<span className={styles.characteristicName}>
										{characteristic.name}
									</span>
									<span className={styles.characteristicDots}></span>
									<span className={styles.characteristicValue}>
										{characteristic.value}
									</span>
								</div>
							))}
						</div>
						<div className={styles.advBlock}>
							{product.advatanges && (
								<div className={styles.advantages}>
									<div className={styles.advTitle}>Advantages</div>
									{product.advatanges}
								</div>
							)}
							{styles.disadvantages && (
								<div className={styles.disadvantages}>
									<div className={styles.advTitle}>Disadvantages</div>
									{product.disAdvatanges}
								</div>
							)}
						</div>
						<Devider className={styles.secondHr} />
						<div className={styles.actions}>
							<Button appearance="primary" className={styles.learnButton}>
								Learn more
							</Button>
							<Button
								appearance="ghost"
								arrow={isReviewOpened ? "down" : "right"}
								aria-expanded={isReviewOpened}
								onClick={() => setIsReviewOpened(!isReviewOpened)}>
								Read reviews
							</Button>
						</div>
					</Card>
					<motion.div
						variants={variants}
						animate={isReviewOpened ? "visible" : "hidden"}
						initial="hidden">
						<Card
							color="blue"
							className={styles.reviews}
							ref={reviewRef}
							tabIndex={isReviewOpened ? 0 : -1}>
							{product.reviews.map((review) => (
								<div key={review._id}>
									<Review review={review} />
									<Devider />
								</div>
							))}
							<ReviewForm isOpened={isReviewOpened} productId={product._id} />
						</Card>
					</motion.div>
				</div>
			);
		}
	)
);
