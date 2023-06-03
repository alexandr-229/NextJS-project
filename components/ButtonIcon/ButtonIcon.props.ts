import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { icons } from "./Button.icons";

export interface ButtonIconProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	icon: keyof typeof icons;
	appearance: "primary" | "ghost";
}
