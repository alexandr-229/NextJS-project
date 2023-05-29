import { ForwardedRef, forwardRef, useRef, useState } from "react";
import styles from "./Product.module.css";
import cn from "classnames";
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
			};

			return (
				<div {...props} ref={ref}>
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
							{priceEn(product.price)}
							{product.oldPrice && (
								<Tag className={styles.oldPrice} color="green">
									{priceEn(product.price - product.oldPrice)}
								</Tag>
							)}
						</div>
						<div className={styles.credit}>
							{priceEn(product.credit)}/
							<span className={styles.month}>Months</span>
						</div>
						<div className={styles.rating}>
							<Rating rating={product.reviewAvg || 0} />
						</div>
						<div className={styles.tags}>
							{product.categories.map((category) => (
								<Tag color="ghost" key={category} className={styles.category}>
									{category}
								</Tag>
							))}
						</div>
						<div className={styles.priceTitle}>Price</div>
						<div className={styles.creditTitle}>Credit</div>
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
								onClick={() => setIsReviewOpened(!isReviewOpened)}>
								Read reviews
							</Button>
						</div>
					</Card>
					<Card
						color="blue"
						className={cn(styles.reviews, {
							[styles.opened]: isReviewOpened,
							[styles.closed]: !isReviewOpened
						})}
						ref={reviewRef}>
						{product.reviews.map((review) => (
							<div key={review._id}>
								<Review review={review} />
								<Devider />
							</div>
						))}
						<ReviewForm productId={product._id} />
					</Card>
				</div>
			);
		}
	)
);
