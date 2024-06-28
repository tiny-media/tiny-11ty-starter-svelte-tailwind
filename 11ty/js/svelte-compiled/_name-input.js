import "svelte/internal/disclose-version";
import * as $ from "svelte/internal/client";
import { onMount } from 'svelte';
import { injectTailwindStyles } from '../../11ty_utilities/injectTailwindIntoSvelte';

var root = $.template(`<main class="text-center p-4 max-w-xs mx-auto bg-gray-100 rounded-lg"><h1 class="text-3xl text-orange-600 mb-4"> </h1> <input placeholder="Enter your name" class="w-full p-2 border border-gray-300 rounded"></main>`);

export default function _name_input($$anchor, $$props) {
	$.push($$props, false);

	let name = $.prop($$props, "name", 4, 'world');

	onMount(() => {
		const shadowRoot = document.querySelector('name-input').shadowRoot;

		injectTailwindStyles(shadowRoot);
	});

	$.init();

	var main = root();
	var h1 = $.child(main);
	var text = $.child(h1);
	var input = $.sibling($.sibling(h1, true));

	$.remove_input_defaults(input);
	$.template_effect(() => $.set_text(text, `Hello ${name() ?? ""}!`));
	$.bind_value(input, name, ($$value) => name($$value));
	$.append($$anchor, main);

	return $.pop({
		get name() {
			return name();
		},
		set name($$value) {
			name($$value);
			$.flush_sync();
		}
	});
}

customElements.define("name-input", $.create_custom_element(_name_input, { name: {} }, [], [], true));