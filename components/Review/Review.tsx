import styles from "./Review.module.css";
import cn from "classnames";
import { ReviewProps } from "./Review.props";
import UserIcon from "./user.svg";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Rating } from "../Rating/Rating";

export const Review = ({
	className,
	review: { name, title, description, rating, createdAt },
	...props
}: ReviewProps): JSX.Element => {
	return (
		<div className={cn(styles.review, className)} {...props}>
			<UserIcon className={styles.user} />
			<div className={styles.title}>
				<span className={styles.name}>{name}:&nbsp;</span>
				<span>{title}</span>
			</div>
			<div className={styles.date}>
				{format(new Date(createdAt), "dd MMMM yyyy", { locale: enUS })}
			</div>
			<div className={styles.rating}>
				<Rating rating={rating} />
			</div>
			<div className={styles.description}>{description}</div>
		</div>
	);
};
