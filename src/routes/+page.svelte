<script>
	import { PUBLIC_BASE_PROJECT } from '$env/static/public';
	import Mocko from '../components/Mocko.svelte';
	import MockoDetail from '../components/MockoDetail.svelte';
	import { mocks, loadItems, loading } from '../stores/mockStores';
	import { onMount } from 'svelte';

	const lengthChars = 12;
	const keyApp = 'NICOCHA_TOKEN';
	onMount(() => {
		let tmpMockCode = localStorage.getItem(keyApp) ?? randomCode(lengthChars);
		inputCode = tmpMockCode;
		setMockCode(tmpMockCode);
	});

	const editCode = () => {
		toggleEdit = !toggleEdit;
	};
	const resetCode = () => {
		inputCode = randomCode(lengthChars);
		setMockCode(inputCode);
	};

	const submitCode = () => {
		inputCode = (inputCode ?? '').toUpperCase();
		setMockCode(inputCode);
		toggleEdit = false;
	};

	const setMockCode = (/** @type {string} */ val) => {
		mockCode = val;
	};

	const randomCode = (/** @type {number} */ longitud) => {
		const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let resultado = '';

		for (let i = 0; i < longitud; i++) {
			const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
			resultado += caracteres.charAt(indiceAleatorio);
		}

		return resultado;
	};

	/**
	 * @type {any}
	 */
	let inputCode;

	/**
	 * @type {string}
	 */
	let mockCode;

	let toggleEdit = false;

	/**
	 * @type {any}
	 */
	let prevData;

	$: if (mockCode) {
		localStorage.setItem(keyApp, mockCode);
		loadItems(mockCode);
	}

	const selectMocko = (/** @type {any} */ e) => {
		prevData = e.detail;
	};
</script>

<section class="flex w-full flex-col">
	<section class="flex flex-col w-full items-center mt-4 pt-4">
		<form on:submit={submitCode} class="flex w-1/2 flex-col">
			<h3 class="text-center text-6xl font-bold font-nicocha mb-4 primary-nicocha-text">Nicocha</h3>

			<div class="relative flex h-10 w-full min-w-[200px] mb-4">
				{#if toggleEdit}
					<div class="!absolute right-1 top-1 z-10">
						<button
							class=" select-none rounded primary-nicocha-bg py-3 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
							type="submit"
							data-ripple-light="true"
						>
							Guardar
						</button>
						<button
							on:click={editCode}
							class=" select-none rounded secondary-nicocha-bg py-3 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
							type="button"
							data-ripple-light="true"
						>
							Cancelar
						</button>
					</div>
				{:else}
					<div class="!absolute right-1 top-1 z-10">
						<button
							on:click={resetCode}
							class=" select-none rounded primary-nicocha-bg py-3 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
							type="button"
							data-ripple-light="true"
						>
							Re-Generar
						</button>
						<button
							on:click={editCode}
							class="select-none rounded secondary-nicocha-bg py-3 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
							type="button"
							data-ripple-light="true"
						>
							Editar
						</button>
					</div>
				{/if}
				<input
					bind:value={inputCode}
					minlength={lengthChars}
					maxlength={lengthChars}
					readonly={!toggleEdit}
					class:bg-slate-200={!toggleEdit}
					type="text"
					class="peer h-full w-full rounded-[7px] border border-blue-gray-200 px-3 py-6 pr-20 font-bold font-sans text-md secondary-nicocha-text outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
					placeholder=" "
					required
				/>
				<label
					class="pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
				>
					Código de Proyecto
				</label>
			</div>
		</form>
		<div class="text-sm text-slate-500">{PUBLIC_BASE_PROJECT}/fake/{mockCode}</div>
	</section>
	{#if $loading}
		<section class="flex justify-center w-full">
			<div class="flex">
				<div class="mt-4" role="status">
					<svg
						aria-hidden="true"
						class="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
					<span class="sr-only">Cargando...</span>
				</div>
			</div>
		</section>
	{/if}
	<section class="flex w-full mt-4">
		<section class="flex w-1/2 p-2">
			<div class="w-full">
				{#each $mocks as mock}
					<Mocko on:select={selectMocko} data={mock} />
				{/each}
			</div>
		</section>
		<section class="flex w-1/2 p-2">
			<div class="flex flex-col w-full">
				<MockoDetail prev={prevData} scope={mockCode}></MockoDetail>
			</div>
		</section>
	</section>
	<section class="mb-8 ml-8">
		<h2 class="text-3xl font-bold">Reglas de Uso:</h2>
		<ul class="list-disc">
			<li>
				El <strong>Código de Proyecto, </strong> se autogenera con cada navegador diferente y se almacena
				en Local Storage. Es decir si en caso borraras tu Local Storage. Perderias el código.
			</li>
			<li>
				En caso de que tengas un Código previo, puedes usarlo. Presionando en el botón Editar.
			</li>
			<li>El servicio es gratuito y almacena toda la info en Supabase Capa Gratuita.</li>
			<li>No uses datos privados, no existe ninguna responsabilidad de almacenaje seguro.</li>
			<li>
				Los mocks creados tienen un tiempo de vida de 7 dias desde su creación. Toma tus
				precauciones.
			</li>
			<li>Se aceptan sugerencias. Escribeme a: <strong>support@equisd.com</strong></li>
		</ul>
	</section>
</section>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
