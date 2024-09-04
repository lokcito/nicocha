import { PUBLIC_BASE_PROJECT } from '$env/static/public';

export async function fetchMocks(code: string, id: number = 0): Promise<any[]> {
	try {
		const response = await fetch(`${PUBLIC_BASE_PROJECT}/mocks/${code}${id === 0 ? '' : '/' + id}`);

		if (!response.ok) {
			throw new Error(`HTTP error ${response.status}`);
		}

		const data = await response.json();

		return data['data'];
	} catch (error) {
		console.error('Error:', error);
		return [];
	}
}
export async function saveMock(body: any) {
	await fetch(`${PUBLIC_BASE_PROJECT}/adminUpsertMock`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
}
export async function deleteMock(scope: string, id: number) {
	fetch(`${PUBLIC_BASE_PROJECT}/adminMock/${scope}/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
