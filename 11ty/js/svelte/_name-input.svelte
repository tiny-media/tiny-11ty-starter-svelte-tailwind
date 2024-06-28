<svelte:options customElement="name-input" />

<script>
  import { onMount } from 'svelte';
  import { injectTailwindStyles } from '../../11ty_utilities/injectTailwindIntoSvelte';

  export let name = 'world';

  onMount(() => {
    const shadowRoot = document.querySelector('name-input').shadowRoot;
    injectTailwindStyles(shadowRoot);
  });
</script>

<main class="text-center p-4 max-w-xs mx-auto bg-gray-100 rounded-lg">
  <h1 class="text-3xl text-orange-600 mb-4">Hello {name}!</h1>
  <input bind:value={name} placeholder="Enter your name" class="w-full p-2 border border-gray-300 rounded" />
</main>