# Tiny 11ty TailwindCSS-Svelte-Vite-Starter

A modern web development starter kit combining the power of:

- **Eleventy (11ty)** for static site generation
- **Tailwind CSS** for styling
- **Svelte** for dynamic components
- **Vite** for fast development and build optimization

## Features

- **Fast Development**: Vite provides instant hot module replacement (HMR) for rapid development.
- **Static Site Generation**: 11ty generates static HTML files for SEO and performance.
- **Dynamic Components**: Svelte components are used for interactive elements.
- **Styling with Tailwind CSS**: Easy, utility-first styling with Tailwind.
- **Alpine.js Integration**: Optional Alpine.js for simple DOM interactions.

## Getting Started

1. **Clone the Repository**:
   ```
   git clone https://github.com/your-repo/tiny-11ty-tailwind-svelte-vite-starter.git
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Start Development Server**:
   ```
   npm run start
   ```

4. **Build for Production**:
   ```
   npm run build
   ```

## Project Structure

- **11ty**: Contains all 11ty-related files.
  - **_css**: Global CSS styles.
  - **_data**: Data files for 11ty.
  - **_includes**: Reusable Liquid templates.
  - **_js**: JavaScript files, including Svelte components.
    - **svelte**: Svelte components and stores.
  - **_layouts**: Base layout for pages.
  - **index.liquid**, **about.liquid**, **test.liquid**: Example pages.

- **11ty_config**: Configuration for the 11ty-vite plugin.
- **eleventy.config.js**: Main 11ty configuration.
- **package.json**: Project dependencies and scripts.

## Creating New Svelte Components

1. **Create a new Svelte file** in `11ty/_js/svelte/`, e.g., `new-component.svelte`.
2. **Add a mount point** in your desired `.liquid` file:
   ```
   <div id="svelte-new-component"></div>
   ```
3. **Update `svelte.js`** to include the new component:
   ```
   const COMPONENT_MAP = {
     // ...
     "svelte-new-component": () => import("./svelte/new-component.svelte"),
   };
   ```

## Persistent State with Svelte Stores

- Use the `stores.svelte.js` file to create shared state stores.
- Example usage in components:
  ```
  <script>
    import { persistentCount } from './stores.svelte.js';
  </script>

  <button on:click={persistentCount.increment}>
    Count: {persistentCount.count}
  </button>
  ```

## Cross-Page Communication

- Svelte stores can be used to synchronize state across pages.
- Example: Incrementing a counter on one page updates it on all pages.

## Contributing

Contributions are welcome! Please submit pull requests with detailed explanations of changes.

## License

[Your License Here]

## Acknowledgments

- [Eleventy](https://www.11ty.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Svelte](https://svelte.dev/)
- [Vite](https://vitejs.dev/)
