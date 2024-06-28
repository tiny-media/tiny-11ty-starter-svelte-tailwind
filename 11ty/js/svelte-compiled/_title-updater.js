import "svelte/internal/disclose-version";
import * as $ from "svelte/internal/client";
import { writable } from 'svelte/store';
import { onMount } from 'svelte';
import { injectTailwindStyles } from '../../11ty_utilities/injectTailwindIntoSvelte';

var root = $.template(`<h1 class="text-2xl font-bold my-3 bg-blue-200 text-red-400"> </h1> <button class="px-4 py-2 bg-green-500 text-white rounded">Change Title</button>`, 1);

export default function _title_updater($$anchor, $$props) {
	$.push($$props, false);

	const $$subscriptions = {};

	$.unsubscribe_on_destroy($$subscriptions);

	const $title = () => $.store_get(title, "$title", $$subscriptions);
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

	$.init();

	var fragment = root();
	var h1 = $.first_child(fragment);
	var text = $.child(h1);
	var button = $.sibling($.sibling(h1, true));

	$.template_effect(() => $.set_text(text, $title()));
	$.event("click", button, changeTitle, false);
	$.append($$anchor, fragment);
	$.pop();
}

customElements.define("title-updater", $.create_custom_element(_title_updater, {}, [], [], true));