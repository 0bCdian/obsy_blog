function withOpacity(variableName) {
	return ({ opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${variableName}), ${opacityValue})`;
		}
		return `rgb(var(${variableName}))`;
	};
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		// Remove the following screen breakpoint or add other breakpoints
		// if one breakpoint is not enough for you
		screens: {
			sm: "640px",
		},

		extend: {
			textColor: {
				skin: {
					base: withOpacity("--color-text-base"),
					accent: withOpacity("--color-accent"),
					inverted: withOpacity("--color-fill"),
					logo: withOpacity("--color-logo"),
				},
			},
			backgroundColor: {
				skin: {
					fill: withOpacity("--color-fill"),
					accent: withOpacity("--color-accent"),
					inverted: withOpacity("--color-text-base"),
					card: withOpacity("--color-card"),
					"card-muted": withOpacity("--color-card-muted"),
				},
			},
			outlineColor: {
				skin: {
					fill: withOpacity("--color-accent"),
				},
			},
			borderColor: {
				skin: {
					line: withOpacity("--color-border"),
					fill: withOpacity("--color-text-base"),
					accent: withOpacity("--color-accent"),
				},
			},
			fill: {
				skin: {
					base: withOpacity("--color-text-base"),
					accent: withOpacity("--color-accent"),
				},
				transparent: "transparent",
			},
			fontFamily: {
				mono: ["JetBrains Mono", "monospace"],
			},
			stroke: {
				skin: {
					accent: withOpacity("--color-accent"),
				},
			},
			typography: {
				DEFAULT: {
					css: {
						pre: {
							color: false,
						},
						code: {
							color: false,
						},
					},
				},
			},
			keyframes: {
				"caret-blink": {
					"0%": { transform: "scaleY(1)", opacity: "1" },
					"50%": { transform: "scaleY(0)", opacity: "0" },
					"95%": { transform: "scaleY(1)", opacity: "1" }, // Hold at full height
					"100%": { transform: "scaleY(1)", opacity: "1" },
				},
			},
			animation: {
				"caret-blink": "caret-blink 1.2s infinite ease-in-out",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
