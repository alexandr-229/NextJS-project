import { forwardRef, ForwardedRef } from "react";
import styles from "./Input.module.css";
import cn from "classnames";
import { InputProps } from "./Input.props";

export const Input = forwardRef(
	(
		{ className, error, ...props }: InputProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		return (
			<div className={cn(styles.inputWrapper, className)}>
				<input
					ref={ref}
					className={cn(styles.input, {
						[styles.error]: error
					})}
					{...props}
				/>
				<span className={styles.errorMessage}>{error && error.message}</span>
			</div>
		);
	}
);
