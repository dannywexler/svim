import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        // See https://svelte.dev/docs/kit/adapters
        adapter: adapter(),
        alias: {
            $: "./src/*",
            $DB: "./src/lib/server/db/database.ts",
            $Tables: "./src/lib/server/db/tables.ts",
        },
    },
};

export default config;
