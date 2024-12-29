import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";

export const PORT = 4000;

export default defineConfig({
    // @ts-expect-error types are confused
    plugins: [sveltekit()],

    test: {
        include: ["src/**/*.{test,spec}.{js,ts}"],
    },
    server: {
        port: PORT,
    },
    preview: {
        port: PORT,
    },
});
