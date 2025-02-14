// 11ty/_js/svelte.js
import { mount } from "svelte";

// Use mount directly; type annotation is optional but can help with type safety
const svelteMount = mount;

const COMPONENT_MAP = {
  "svelte-counter": () => import("./svelte/counter.svelte"),
  "svelte-count-display": () => import("./svelte/count-display.svelte"),
};

async function mountComponents() {
  try {
    await Promise.all(
      Object.entries(COMPONENT_MAP).map(async ([id, componentImport]) => {
        const target = document.getElementById(id);
        if (target) {
          const { default: Component } = await componentImport();
          mount(Component, { target }); // Use mount directly for simplicity
        }
      }),
    );
  } catch (error) {
    console.error("Component mounting error:", error);
  }
}

// Add HMR support for development
if (import.meta.hot) {
  import.meta.hot.accept(mountComponents);
}

// Ensure DOM is ready before mounting components
document.addEventListener("DOMContentLoaded", mountComponents);
