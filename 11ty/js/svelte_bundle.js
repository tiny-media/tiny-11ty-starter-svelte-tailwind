import "./_fileA-1.js";
import "./_fileA-2.js";
import DerivedState from "./svelte/_derived-state.svelte";
import NameInput from "./svelte/_name-input.svelte";
import TitleUpdater from "./svelte/_title-updater.svelte";

console.log("svelte_Bundled.js loaded");

if (!customElements.get("derived-state")) {
	customElements.define("derived-state", DerivedState);
}

if (!customElements.get("name-input")) {
	customElements.define("name-input", NameInput);
}

if (!customElements.get("title-updater")) {
	customElements.define("title-updater", TitleUpdater);
}
