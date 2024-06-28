import "./_fileA-1.js";
import "./_fileA-2.js";
import DerivedState from "./svelte-compiled/_derived-state.js";
import NameInput from "./svelte-compiled/_name-input.js";
import TitleUpdater from "./svelte-compiled/_title-updater.js";

console.log("svelte_Bundled2.js loaded");

if (!customElements.get("derived-state")) {
	customElements.define("derived-state", DerivedState);
}

if (!customElements.get("name-input")) {
	customElements.define("name-input", NameInput);
}

if (!customElements.get("title-updater")) {
	customElements.define("title-updater", TitleUpdater);
}
