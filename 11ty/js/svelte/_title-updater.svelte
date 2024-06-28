<svelte:options customElement="title-updater" />

<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { injectTailwindStyles } from '../../11ty_utilities/injectTailwindIntoSvelte';

  const title = writable('Hello Svelte 5!');

  onMount(() => {
    const unsubscribe = title.subscribe((value) => {
      document.title = value;
    });

    const shadowRoot = document.querySelector('title-updater').shadowRoot;
    injectTailwindStyles(shadowRoot);

    return () => unsubscribe(); // Cleanup subscription on unmount
  });

  function changeTitle() {
    title.set('Svelte 5 is Awesome!');
  }
</script>

<h1 class="text-2xl font-bold my-3 bg-blue-200 text-red-400">{$title}</h1> <!-- Use $title to access the store value -->
<button on:click={changeTitle} class="px-4 py-2 bg-green-500 text-white rounded">Change Title</button>