import {
	useEffect,
	useState,
	KeyboardEvent,
	forwardRef,
	ForwardedRef,
	useRef
} from "react";
import cn from "classnames";

import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import StartIcon from "./Star.svg";

export const Rating = forwardRef(
	(
		{
			isEditable = false,
			rating,
			error,
			setRating,
			tabIndex,
			...props
		}: RatingProps,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
			new Array(5).fill(<></>)
		);
		const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

		useEffect(() => {
			constractRating(rating);
		}, [rating, tabIndex]);

		const computeFocus = (r: number, i: number): number => {
			if (!isEditable) {
				return -1;
			}
			if (!rating && i === 0) {
				return tabIndex || 0;
			}
			if (r === i + 1) {
				return 0;
			}
			return -1;
		};

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
						onClick={() => onClick(i + 1)}
						onKeyDown={handleKey}
						tabIndex={computeFocus(rating, i)}
						role={isEditable ? "slider" : ""}
						aria-valuemax={5}
						aria-valuemin={1}
						aria-valuenow={rating}
						aria-invalid={!!error}
						aria-label={
							isEditable
								? "Use the up or down arrows to rate"
								: `Rating is ${rating}`
						}
						ref={(r) => ratingArrayRef.current?.push(r)}>
						<StartIcon />
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

		const handleKey = (event: KeyboardEvent) => {
			if (!isEditable || !setRating) {
				return;
			}
			if (event.code === "ArrowRight" || event.code === "ArrowUp") {
				event.preventDefault();
				if (!rating) {
					setRating(1);
				} else {
					setRating(rating < 5 ? rating + 1 : 5);
				}
				ratingArrayRef.current[rating]?.focus();
			}
			if (event.code === "ArrowLeft" || event.code === "ArrowDown") {
				event.preventDefault();
				if (!rating) {
					setRating(5);
				} else {
					setRating(rating > 1 ? rating - 1 : 1);
				}
				ratingArrayRef.current[rating - 2]?.focus();
			}
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
