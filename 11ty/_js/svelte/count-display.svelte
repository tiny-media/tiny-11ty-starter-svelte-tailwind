<!-- 11ty/_js/svelte/CountDisplay.svelte -->
<script>
    import { persistentCount } from "./stores.svelte.js";
</script>

<h3 class="text-xl font-semibold mb-2">
    Current Count: {persistentCount.count}
</h3>
