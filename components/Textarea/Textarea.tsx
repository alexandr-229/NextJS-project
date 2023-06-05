import styles from "./Textarea.module.css";
import cn from "classnames";
import { TextareaProps } from "./Textarea.props";
import { ForwardedRef, forwardRef } from "react";

export const Textarea = forwardRef(
	(
		{ children, className, error, ...props }: TextareaProps,
		ref: ForwardedRef<HTMLTextAreaElement>
	) => {
		return (
			<div className={cn(styles.textareaWrapper, className)}>
				<textarea
					ref={ref}
					className={cn(styles.textarea, {
						[styles.error]: error
					})}
					{...props}
				/>
				{error && (
					<span role="alert" className={styles.errorMessage}>
						{error.message}
					</span>
				)}
			</div>
		);
	}
);
