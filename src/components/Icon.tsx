import type React from "react";
import logo from "../assets/logo.png";
import muffin404 from "../assets/404-muffin.png";
import classNames from "classnames";

import bootstrapIcons from "bootstrap-icons/font/bootstrap-icons.json";

export const images = {
	logo,
	muffin404,
};

export type iconName = keyof typeof images | keyof typeof bootstrapIcons;

export default function Icon<T extends iconName>(props: {
	iconName: T;
	alt?: T extends keyof typeof images ? string : undefined;
	className?: string;
	"class:list"?: classNames.ArgumentArray;
	style?: React.CSSProperties;
	width?: number | string;
	height?: number | string;
	rounded?: boolean;
	children?: React.ReactNode;
}): JSX.Element {
	if (!props.iconName) return <></>;

	if (props.iconName in images) {
		const src = images[props.iconName as keyof typeof images];
		return (
			<img
				src={src.src}
				style={props.style}
				title={props.alt}
				className={classNames(
					{ rounded: props.rounded !== false },
					props.className,
					props["class:list"]
				)}
				width={props.width ?? src.width}
				height={props.height ?? src.height}
			/>
		);
	}

	if (Object.keys(bootstrapIcons).includes(props.iconName)) {
		return (
			<span
				className={classNames(
					"bi",
					"bi-" + props.iconName,
					props.className,
					props["class:list"]
				)}
				style={props.style}
			>
				{props.children}
			</span>
		);
	}
	throw new Error(`Icon "${props.iconName}" not found!`);
}
