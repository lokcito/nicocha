import { writable } from 'svelte/store';
import { MockModel } from '../models/mockModel';
import { fetchMocks } from './../lib/services';
import { updated } from '$app/stores';

const initialMock: MockModel[] = [];

const initialSingleMock: MockModel = new MockModel({
	id: 0,
	token: '',
	method: '',
	sufix: '',
	data: '',
	updated_at: '',
	status_code: 200
});

export const mocks = writable(initialMock);

export const loadItems = async (code: string) => {
	loading.set(true);
	try {
		const data = await fetchMocks(code);
		loading.set(false);
		mocks.set(data.map((e) => new MockModel({ ...e, data: '' })));
	} catch (error) {
		loading.set(false);
		console.error('Error loading items:', error);
	}
};
export const loading = writable(false);

export const singleMock = writable(initialSingleMock);
export const cleanItem = () => {
	singleMock.set({} as MockModel);
};
export const loadItem = async (code: string, id: number) => {
	loading.set(true);
	try {
		const data = await fetchMocks(code, id);
		loading.set(false);
		if (data && data.length > 0) {
			singleMock.set(new MockModel({ ...data[0], data: JSON.stringify(data[0].data) }));
		} else {
			singleMock.set({} as MockModel);
		}
	} catch (error) {
		loading.set(false);
		console.error('Error loading items:', error);
	}
};
