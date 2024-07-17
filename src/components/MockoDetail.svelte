<script lang="ts">
	import { deleteMock, saveMock } from '$lib/services';
	import { MockModel } from '../models/mockModel';
	import { cleanItem, loading, loadItem, loadItems, singleMock } from '../stores/mockStores';
	import MockoCurl from './MockoCurl.svelte';
	import MockoResponse from './MockoResponse.svelte';
	export let scope = '';
	export let prev: MockModel;

	let id: number = 0;

	let inputSufix: any;

	let inputStatusCode: any;

	let inputMethod: any;

	let inputData: any;

	let finalContent: any;
	let fullPath: string;
	let tried: boolean = false;
	const deleteTmpMock = async () => {
		loading.set(true);
		await deleteMock(scope, id);
		await loadItems(scope);
	};
	const saveDetail = async (event: any) => {
		loading.set(true);
		await saveMock({
			token: scope,
			sufix: inputSufix,
			data: finalContent,
			method: inputMethod,
			status_code: inputStatusCode
		});
		await loadItems(scope);
	};

	$: if (prev) {
		tried = false;
		loadItem(scope, prev.id);
	}
	$: if ($singleMock) {
		if ($singleMock.id && $singleMock.id > 0) {
			id = $singleMock.id;
			tried = false;
			inputSufix = $singleMock.sufix;
			inputMethod = $singleMock.method;
			inputStatusCode = $singleMock.status_code + '';
			inputData = $singleMock.data;
			fullPath = $singleMock.fullPath;
			cleanItem();
		}
	}
</script>

<section>
	<form
		on:submit|preventDefault={saveDetail}
		class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
	>
		<div class="mb-2">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="sufix">Sufijo</label>
			<input
				required
				bind:value={inputSufix}
				class:border-red-500={tried && !inputSufix}
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="sufix"
				type="text"
				placeholder="clientes"
			/>
		</div>
		<div class="mb-2">
			<div class="flex flex-row gap-2">
				<div class="w-full">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="sufix">Método</label>

					<select
						required
						class:border-red-500={tried && !inputMethod}
						bind:value={inputMethod}
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					>
						<option value="GET">GET</option>
						<option value="POST">POST</option>
						<option value="PUT">PUT</option>
						<option value="DELETE">DELETE</option>
					</select>
				</div>
				<div class="w-full">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="sufix"
						>Códigos de estado</label
					>

					<select
						required
						class:border-red-500={tried && !inputStatusCode}
						bind:value={inputStatusCode}
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					>
						<option value="200">200</option>
						<option value="201">201</option>
						<option value="400">400</option>
						<option value="401">401</option>
						<option value="404">404</option>
						<option value="500">500</option>
					</select>
				</div>
			</div>
		</div>
		<div class="mb-2">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="data">Contenido</label>
			<textarea
				required
				bind:value={inputData}
				class:border-red-500={tried && !inputData}
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
			></textarea>
		</div>
		<div class="flex items-center justify-between mb-4">
			<button
				on:click={() => {
					tried = true;
				}}
				class="select-none rounded primary-nicocha-bg py-3 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
				type="submit"
			>
				Guardar Mock
			</button>
			{#if id > 0}
				<button
					on:click={() => {
						if (confirm('Estas seguro de eliminar este Mock?')) {
							deleteTmpMock();
						}
					}}
					class="select-none rounded secondary-nicocha-bg py-3 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
					type="button"
				>
					Eliminar Mock
				</button>
			{/if}
		</div>
		<div class="mb-4">
			<MockoResponse
				on:content={(e) => (finalContent = e.detail)}
				statusCode={inputStatusCode}
				nativeJson={inputData}
			></MockoResponse>
		</div>
		<div class="mb-4">
			<MockoCurl
				tmpMock={new MockModel({
					id: 0,
					token: scope ?? '',
					sufix: inputSufix ?? '',
					method: inputMethod ?? '',
					updated_at: '',
					status_code: 0,
					data: ''
				})}
			></MockoCurl>
		</div>
	</form>
</section>
