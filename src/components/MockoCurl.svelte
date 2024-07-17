<script lang="ts">
	import { MockModel } from '../models/mockModel';
	let command = '';
	let params = '-d \'{"param1": "Val1", "param2": "Val2"}\'';
	export let tmpMock: MockModel = new MockModel({ id: 0, status_code: 0 });

	$: if (tmpMock) {
		makeCommand();
	}

	const makeCommand = () => {
		if (tmpMock.method === 'GET') {
			command = `curl -X ${tmpMock.method} -H "Content-Type: application/json" ${tmpMock.fullPath}`;
		} else if (tmpMock.method === 'POST' || tmpMock.method === 'PUT') {
			command = `curl -X ${tmpMock.method} -H "Content-Type: application/json" ${params} ${tmpMock.fullPath}`;
		}
	};
	const copyToClipboard = () => {
		try {
			navigator.clipboard.writeText(command);
		} catch (error) {
			prompt('Copiar: ', command);
		}
	};
</script>

<div class="bg-slate-950 text-green-700 rounded pl-2 pr-2 pt-1 pb-4">
	<div class="flex justify-between">
		<div class="text-slate-500 font-bold text-xs">Solicitud</div>
		<button
			on:click={copyToClipboard}
			type="button"
			class="text-slate-500 font-bold text-xs hover:text-slate-300">Copiar</button
		>
	</div>
	<div class="pl-4 pr-4 text-sm flex-wrap flex">
		<span>
			{`curl -X ${tmpMock.method} -H "Content-Type: application/json" ${tmpMock.method === 'POST' || tmpMock.method === 'PUT' ? params : ''}`}
		</span>
		<span class="text-white font-bold">
			{tmpMock.basePath}
		</span>
		/
		<span class="text-orange-300 font-bold">
			{tmpMock.token}
		</span>
		/
		<span class="text-pink-500 font-bold">{tmpMock.sufix}</span>
	</div>
</div>
