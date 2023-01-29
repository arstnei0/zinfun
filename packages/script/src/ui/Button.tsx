import { Component, JSX } from "solid-js"

export const Button: Component<JSX.ButtonHTMLAttributes<"button">> = (
	props
) => {
	return (
		<button {...(props as any)} class="zf-button">
			{props.children}
		</button>
	)
}
