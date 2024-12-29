<script lang="ts">
    import "../app.css";
    import { page } from "$app/state";
    let { children } = $props();

    import { NavItem, settings } from "svelte-ux";

    settings({
        components: {
            Button: {
                color: "primary",
                variant: "fill",
            },
        },
    });
    const routes = ["", "routeA", "routeB"];
</script>

<nav class="flex">
    {#each routes as route}
        <NavItem
            text={route.length ? route : "root"}
            currentUrl={page.url}
            path={`/${route}`}
            classes={{
                root: "px-3",
                active: "bg-primary text-black rounded",
            }}
        />
    {/each}
</nav>

{@render children()}
