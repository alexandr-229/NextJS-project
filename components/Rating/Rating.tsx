import {
	useEffect,
	useState,
	KeyboardEvent,
	forwardRef,
	ForwardedRef
} from "react";
import cn from "classnames";

import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import StartIcon from "./Star.svg";

export const Rating = forwardRef(
	(
		{ isEditable = false, rating, error, setRating, ...props }: RatingProps,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
			new Array(5).fill(<></>)
		);

		useEffect(() => {
			constractRating(rating);
		}, [rating]);

		const constractRating = (currentRating: number) => {
			const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
				return (
					<span
						className={cn(styles.star, {
							[styles.filled]: i < currentRating,
							[styles.editable]: isEditable
						})}
						onMouseEnter={() => changeDisplay(i + 1)}
						onMouseLeave={() => changeDisplay(rating)}
						onClick={() => onClick(i + 1)}>
						<StartIcon
							onKeyDown={(event: KeyboardEvent<SVGAElement>) =>
								isEditable && handleSpace(i + 1, event)
							}
							tabIndex={isEditable ? 0 : -1}
						/>
					</span>
				);
			});
			setRatingArray(updatedArray);
		};

		const changeDisplay = (i: number) => {
			if (!isEditable) {
				return;
			}
			constractRating(i);
		};

		const onClick = (i: number) => {
			if (!isEditable || !setRating) {
				return;
			}
			setRating(i);
		};

		const handleSpace = (i: number, event: KeyboardEvent<SVGAElement>) => {
			if (event.code !== "Space" || !setRating) {
				return;
			}
			setRating(i);
		};

		return (
			<div
				{...props}
				ref={ref}
				className={cn(styles.ratingWrapper, {
					[styles.error]: error
				})}>
				{ratingArray.map((r: JSX.Element, i: number) => (
					<span key={i}>{r}</span>
				))}
			</div>
		);
	}
);
