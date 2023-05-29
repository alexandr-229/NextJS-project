import styles from "./justjoinit.module.css";
import { JustjoiniProps } from "./justjoinit.props";
import { Card } from "../Card/Card";
import RateIcon from "./Rate.svg";
import { priceEn } from "@/helpers/helpers";

export const Justjoinit = ({
	count,
	juniorSalary,
	middleSalary,
	seniorSalary
}: JustjoiniProps): JSX.Element => {
	return (
		<div className={styles.justjoinit}>
			<Card className={styles.count}>
				<div className={styles.title}>Total: </div>
				<div className={styles.countValue}>{count}</div>
			</Card>
			<Card className={styles.salary}>
				<div>
					<div className={styles.title}>Junior</div>
					<div className={styles.salaryValue}>{priceEn(juniorSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled} />
						<RateIcon />
						<RateIcon />
					</div>
				</div>
				<div>
					<div className={styles.title}>Middle</div>
					<div className={styles.salaryValue}>{priceEn(middleSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
						<RateIcon />
					</div>
				</div>
				<div>
					<div className={styles.title}>Senior</div>
					<div className={styles.salaryValue}>{priceEn(seniorSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
					</div>
				</div>
			</Card>
		</div>
	);
};
