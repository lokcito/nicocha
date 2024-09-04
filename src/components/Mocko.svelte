<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { MockModel } from '../models/mockModel';
	import { format } from 'date-fns';
	import { toast } from '@zerodevx/svelte-toast';

	const dispatch = createEventDispatcher();

	export let data = new MockModel({ id: 0, token: '' });
	const keyApp = 'NICOCHA_TOKEN';
	let tmpMockCode = '';
	onMount(() => {
		tmpMockCode = localStorage.getItem(keyApp) ?? '';
		// loadItems
	});
	const select = () => {
		dispatch('select', data);
	};

	const copyToClipboard = () => {
		try {
			navigator.clipboard.writeText(data.fullPath);
			toast.push('Copiado en tu portapapeles.');
		} catch (error) {
			prompt('Copiar: ', data.fullPath);
		}
	};
</script>

<div class="mb-4">
	<section class="w-full bg-white pr-4 pl-4 pt-2 pb-2 shadow-md rounded">
		<section class="flex flex-col gap-2">
			<div class="flex flex-row justify-between">
				<button on:click={select} class="flex flex-row">
					<div class="pr-2">{data.method}</div>
					<div>/{data.sufix}</div>
				</button>
				<div>
					<button on:click={copyToClipboard} class="p-1 text-xs rounded bg-slate-300" type="button"
						>Copiar Url</button
					>
				</div>
			</div>
			<div class="flex flex-row justify-between text-xs">
				<div>Código de Respuesta: {data.status_code}</div>
				<div>Actualizado al: {format(new Date(data.updated_at), 'yyyy-MM-dd HH:mm')}</div>
			</div>
		</section>
	</section>
</div>

<style>
</style>
