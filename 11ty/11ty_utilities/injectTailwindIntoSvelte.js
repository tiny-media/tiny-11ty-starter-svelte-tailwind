// src/utils/injectTailwindStyles.js

export function injectTailwindStyles(shadowRoot) {
    function tryInject() {
      if (shadowRoot) {
        const style = document.createElement('style');
        style.textContent = `@import url('/css/tailwind.css');`;
        shadowRoot.appendChild(style);
      } else {
        setTimeout(tryInject, 50); // Retry after 50ms if shadowRoot not found
      }
    }
    
    tryInject();
  }