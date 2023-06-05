import { useState, KeyboardEvent } from "react";
import styles from "./ReviewForm.module.css";
import cn from "classnames";
import { ReviewFormProps } from "./ReviewForm.props";
import { Input, Rating, Textarea, Button } from "@/components";
import CloseIcon from "./close.svg";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm, IReviewSentResponse } from "./review.form.interface";
import axios from "axios";
import { API } from "@/helpers/api";

export const ReviewForm = ({
	className,
	productId,
	isOpened,
	...props
}: ReviewFormProps): JSX.Element => {
	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
		clearErrors
	} = useForm<IReviewForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(
				API.review.create,
				{
					...formData,
					productId
				}
			);
			if (data._id) {
				setIsSuccess(true);
				reset();
			} else {
				setIsError(true);
			}
		} catch (e) {
			console.log(e);
			setIsError(true);
		}
	};

	const closeModal = (
		event: KeyboardEvent,
		func: typeof setIsSuccess | typeof setIsError
	) => {
		if (event.code === "Enter" || event.code === "Space") {
			event.preventDefault();
			func(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					placeholder="Name"
					{...register("name", {
						required: { value: true, message: "Name is required filed" }
					})}
					error={errors.name}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={!!errors.name}
				/>
				<Input
					placeholder="Title"
					className={styles.title}
					{...register("title", {
						required: { value: true, message: "Title is required filed" }
					})}
					error={errors.title}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={!!errors.title}
				/>
				<div className={styles.rating}>
					<span>Rating</span>
					<Controller
						control={control}
						name="rating"
						rules={{
							required: {
								value: true,
								message: "Rating is required filed"
							}
						}}
						render={({ field }) => (
							<Rating
								rating={field.value}
								isEditable
								setRating={field.onChange}
								ref={field.ref}
								error={errors.rating}
								tabIndex={isOpened ? 0 : -1}
							/>
						)}
					/>
				</div>
				<Textarea
					className={styles.description}
					placeholder="Text"
					aria-label="Specify the text of the review"
					{...register("description", {
						required: { value: true, message: "Text is required filed" }
					})}
					error={errors.description}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={!!errors.description}
				/>
				<div className={styles.submit}>
					<Button
						appearance="primary"
						tabIndex={isOpened ? 0 : -1}
						onClick={() => clearErrors()}>
						Send
					</Button>
					<span className={styles.info}>
						* Before publication, the review will be pre-moderated and checked
					</span>
				</div>
			</div>
			{isSuccess && (
				<div className={cn(styles.success, styles.panel)}>
					<div className={styles.panelTitle} role="alert">
						Review sent
					</div>
					<div>Thank you, your review will be published after verification</div>
					<button
						aria-label="Close modal"
						className={styles.close}
						onClick={() => setIsSuccess(false)}
						onKeyDown={(event: KeyboardEvent) =>
							closeModal(event, setIsSuccess)
						}>
						<CloseIcon />
					</button>
				</div>
			)}
			{isError && (
				<div className={cn(styles.error, styles.panel)}>
					<div className={styles.panelTitle} role="alert">
						Something went wrong, try to reload the page
					</div>
					<button
						aria-label="Close modal"
						className={styles.close}
						onClick={() => setIsError(false)}
						onKeyDown={(event: KeyboardEvent) => closeModal(event, setIsError)}>
						<CloseIcon />
					</button>
				</div>
			)}
		</form>
	);
};
