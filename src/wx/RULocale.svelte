<script>
	import { setContext } from "svelte";
	import ruLocale from "./locales/ru";

	export let words = {};
	const locale = ruLocale().extend(words);

	setContext("wx-i18n", locale);
</script>

<slot />
