<script>
	import { JsonView } from '@zerodevx/svelte-json-view';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/**
	 * @type {any}
	 */
	export let statusCode = '';
	export let nativeJson = '';
	let json = {};
	let valid = true;

	$: if (nativeJson) {
		if (nativeJson && (nativeJson[0] === '{' || nativeJson[0] === '[')) {
			try {
				json = JSON.parse(nativeJson);
				valid = true;
			} catch (err) {
				valid = false;
			}
		} else {
			json = nativeJson;
			valid = false;
		}

		dispatch('content', json);
	}
</script>

<div class="bg-slate-950 rounded pl-2 pr-2 pt-1 pb-4">
	<div class="flex flex-row justify-between">
		<div class="text-slate-500 font-bold text-xs">Respuesta {valid ? 'Json' : 'Texto Plano'}</div>
		<div class="text-slate-500 font-bold text-xs">Código de respuesta: {statusCode}</div>
	</div>
	<div class="pl-4 pr-4 overflow-auto">
		{#if valid}
			<div class="wrap">
				<JsonView {json} />
			</div>
		{:else}
			<div class="text-slate-400">
				{json}
			</div>
		{/if}
	</div>
</div>

<style>
	.wrap {
		--jsonBracketColor: white;
		--jsonSeparatorColor: white;
		--jsonBracketHoverBackground: transparent;
		--jsonKeyColor: #06a976;
		--jsonBorderLeft: 1px dashed #777;
	}
</style>
