<script>
	import { setContext } from "svelte";
	import enLocale from "./locales/en";

	export let words = {};
	const locale = enLocale().extend(words);

	setContext("wx-i18n", locale);
</script>

<slot />
