<script>
	import '../app.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	const options = {};
</script>

<SvelteToast {options} />
<div class="pl-4 pr-4">
	<slot />
</div>
