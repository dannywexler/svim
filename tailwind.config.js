import { teal, blue, gray, sky, zinc } from "tailwindcss/colors";
// @ts-expect-error missing dts
import svelteUx from "svelte-ux/plugins/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,svelte}",
        "./node_modules/svelte-ux/**/*.{svelte,js}",
    ],
    theme: {
        fontSize: {
            sm: "0.8rem",
            base: "1.3rem",
            lg: "1.5rem",
            xl: "2rem",
        },
        extend: {},
    },
    ux: {
        themes: {
            light: {
                primary: teal["500"],
                "primary-content": "white",
                secondary: blue["500"],
                "surface-100": "white",
                "surface-200": gray["100"],
                "surface-300": gray["300"],
                "surface-content": gray["900"],
                "color-scheme": "light",
            },
            dark: {
                primary: sky["400"],
                "primary-content": "black",
                secondary: blue["500"],
                "surface-100": zinc["800"],
                "surface-200": zinc["900"],
                "surface-300": zinc["950"],
                "surface-content": zinc["100"],
                "color-scheme": "dark",
            },
        },
    },
    plugins: [
        svelteUx, // uses hsl() color space by default. To use oklch(), use: svelteUx({ colorSpace: 'oklch' }),
    ],
};
