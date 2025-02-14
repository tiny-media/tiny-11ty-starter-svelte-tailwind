// 11ty/_js/svelte/stores.svelte.js
export const persistentCount = (() => {
  // Initialize state from localStorage
  let state = $state({
    value: Number(localStorage.getItem("persistentCount")) || 0,
  });

  // Create effect scope for cross-tab sync
  const cleanup = $effect.root(() => {
    // Local storage sync
    $effect(() => {
      localStorage.setItem("persistentCount", state.value.toString());
    });

    // Cross-tab synchronization
    const storageHandler = (event) => {
      if (event.key === "persistentCount") {
        state.value = Number(event.newValue);
      }
    };

    window.addEventListener("storage", storageHandler);

    return () => window.removeEventListener("storage", storageHandler);
  });

  return {
    get count() {
      return state.value;
    },
    set count(value) {
      state.value = value;
    },
    increment() {
      state.value++;
    },
    destroy() {
      cleanup();
    },
  };
})();
