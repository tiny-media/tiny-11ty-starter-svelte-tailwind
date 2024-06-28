import "svelte/internal/disclose-version";
import * as $ from "svelte/internal/client";
import { writable, derived } from 'svelte/store';
import { onMount } from 'svelte';
import { injectTailwindStyles } from '../../11ty_utilities/injectTailwindIntoSvelte';

var root = $.template(`<h1 class="text-2xl font-bold my-3"> </h1> <h1 class="text-2xl font-bold mb-3"> </h1> <button class="px-4 py-2 bg-blue-500 text-white rounded">Increment</button>`, 1);

export default function _derived_state($$anchor, $$props) {
	$.push($$props, false);

	const $$subscriptions = {};

	$.unsubscribe_on_destroy($$subscriptions);

	const $count = () => $.store_get(count, "$count", $$subscriptions);
	const $double = () => $.store_get(double, "$double", $$subscriptions);
	const count = writable(0);
	const double = derived(count, ($count) => $count * 2);

	function increment() {
		count.update((n) => n + 1);
	}

	onMount(() => {
		const shadowRoot = document.querySelector('derived-state').shadowRoot;

		injectTailwindStyles(shadowRoot);
	});

	$.init();

	var fragment = root();
	var h1 = $.first_child(fragment);
	var text = $.child(h1);
	var h1_1 = $.sibling($.sibling(h1, true));
	var text_1 = $.child(h1_1);
	var button = $.sibling($.sibling(h1_1, true));

	$.template_effect(() => {
		$.set_text(text, `Count: ${$count() ?? ""}`);
		$.set_text(text_1, `Double: ${$double() ?? ""}`);
	});

	$.event("click", button, increment, false);
	$.append($$anchor, fragment);
	$.pop();
}

customElements.define("derived-state", $.create_custom_element(_derived_state, {}, [], [], true));