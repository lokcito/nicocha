import { PUBLIC_BASE_PROJECT } from '$env/static/public';

export class MockModel {
	id: number = 0;
	token: string = '';
	method: string = '';
	sufix: string = '';
	status_code: number = 0;
	data: string = '';
	updated_at: string = '';
	constructor(data: unknown) {
		this.validateAndAssign(data);
	}

	public get fullPath(): string {
		return `${PUBLIC_BASE_PROJECT}/fake/${this.token}/${this.sufix}`;
	}
	public get basePath(): string {
		return `${PUBLIC_BASE_PROJECT}/fake`;
	}

	private validateAndAssign(data: unknown): void {
		if (this.isMockData(data)) {
			this.id = data.id;
			this.token = data.token;
			this.method = data.method;
			this.sufix = data.sufix;
			this.status_code = data.status_code;
			this.data = data.data;
			this.updated_at = data.updated_at;
		} else {
			throw new Error('Invalid data provided to Mock constructor');
		}
	}

	private isMockData(_data: unknown): _data is {
		id: number;
		token: string;
		method: string;
		sufix: string;
		status_code: number;
		data: string;
		updated_at: string;
	} {
		if (typeof _data !== 'object' || _data === null) {
			return false;
		}

		const { id, token, method, sufix, status_code, data, updated_at } = _data as {
			id?: unknown;
			token?: unknown;
			method?: unknown;
			sufix?: unknown;
			status_code?: unknown;
			data?: unknown;
			updated_at?: unknown;
		};

		return (
			typeof id === 'number' &&
			typeof method === 'string' &&
			typeof token === 'string' &&
			typeof sufix === 'string' &&
			typeof status_code === 'number' &&
			typeof data === 'string' &&
			typeof updated_at === 'string'
		);
	}
}
