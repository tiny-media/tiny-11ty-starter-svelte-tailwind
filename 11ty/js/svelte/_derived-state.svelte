<svelte:options customElement="derived-state" />

<script>
  import { writable, derived } from 'svelte/store';
  import { onMount } from 'svelte';
  import { injectTailwindStyles } from '../../11ty_utilities/injectTailwindIntoSvelte';

  const count = writable(0);
  const double = derived(count, $count => $count * 2);

  function increment() {
    count.update(n => n + 1);
  }

  onMount(() => {
    const shadowRoot = document.querySelector('derived-state').shadowRoot;
    injectTailwindStyles(shadowRoot);
  });
</script>

<h1 class="text-2xl font-bold my-3">Count: {$count}</h1>
<h1 class="text-2xl font-bold mb-3">Double: {$double}</h1>
<button on:click={increment} class="px-4 py-2 bg-blue-500 text-white rounded">Increment</button>