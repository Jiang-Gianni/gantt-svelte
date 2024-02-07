import { LocalData, LocalState } from "@dhtmlx/trial-lib-gantt";
import { writable } from "svelte/store";
import { tick } from "svelte";

export class SvelteLocalData extends LocalData {
	initStore() {
		super.initStore();
		const s = this.state;
		s.tasks = writable([]);
		s.links = writable([]);
		s.scales = writable([]);
	}

	updateStore(obj) {
		const state = this.state;
		const data = this._data;

		for (var key in obj) {
			if (obj[key] && state[key]) {
				if (state[key].set) state[key].set(data[key]);
				else state[key] = data[key];
			}
		}
	}
}

export class SvelteLocalState extends LocalState {
	constructor() {
		super(n => writable(n));
	}
	actions(store, dispatch) {
		return super.actions(store, dispatch, tick);
	}
}
