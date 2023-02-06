import { Component } from "solid-js"
import { ThemeToggleButton } from "zulse/ThemeToggleButton"

export const Header: Component = () => {
	return (
		<>
			<header>
				<div>Dashboard</div>
				<ThemeToggleButton />
			</header>
		</>
	)
}
