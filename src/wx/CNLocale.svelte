<script>
	import { setContext } from "svelte";
	import cnLocale from "./locales/cn";

	export let words = {};
	const locale = cnLocale().extend(words);

	setContext("wx-i18n", locale);
</script>

<slot />
