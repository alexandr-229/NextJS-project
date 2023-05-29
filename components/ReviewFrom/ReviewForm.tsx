import { useState } from "react";
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
	...props
}: ReviewFormProps): JSX.Element => {
	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors }
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

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					placeholder="Name"
					{...register("name", {
						required: { value: true, message: "Name is required filed" }
					})}
					error={errors.name}
				/>
				<Input
					placeholder="Title"
					className={styles.title}
					{...register("title", {
						required: { value: true, message: "Title is required filed" }
					})}
					error={errors.title}
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
							/>
						)}
					/>
				</div>
				<Textarea
					className={styles.description}
					placeholder="Text"
					{...register("description", {
						required: { value: true, message: "Text is required filed" }
					})}
					error={errors.description}
				/>
				<div className={styles.submit}>
					<Button appearance="primary">Send</Button>
					<span className={styles.info}>
						* Before publication, the review will be pre-moderated and checked
					</span>
				</div>
			</div>
			{isSuccess && (
				<div className={cn(styles.success, styles.panel)}>
					<div className={styles.panelTitle}>Review sent</div>
					<div>Thank you, your review will be published after verification</div>
					<CloseIcon
						className={styles.close}
						onClick={() => setIsSuccess(false)}
					/>
				</div>
			)}
			{isError && (
				<div className={cn(styles.error, styles.panel)}>
					<div className={styles.panelTitle}>
						Something went wrong, try to reload the page
					</div>
					<CloseIcon
						className={styles.close}
						onClick={() => setIsError(false)}
					/>
				</div>
			)}
		</form>
	);
};
