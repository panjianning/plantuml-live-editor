import { writable, get, derived } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { persist, localStorage } from '@macfja/svelte-persistent-store';
import type { State } from '$lib/types';
import { saveStatistics } from './stats';
import { serializeState, deserializeState } from './serde';

export const defaultState: State = {
	code: `Bob->Alice : dummy
Bob<--Alice : dummy
  `,
	mermaid: JSON.stringify(
		{
			theme: 'default'
		},
		null,
		2
	),
	updateEditor: false,
	autoSync: true,
	updateDiagram: true
};

const urlParseFailedState = `graph TD
    A[Loading URL failed. We can try to figure out why.] -->|Decode JSON| B(Please check the console to see the JSON and error details.)
    B --> C{Is the JSON correct?}
    C -->|Yes| D(Please Click here to Raise an issue in github.<br/>Including the broken link in the issue <br/> will speed up the fix.)
    C -->|No| E{Did someone <br/>send you this link?}
    E -->|Yes| F[Ask them to send <br/>you the complete link]
    E -->|No| G{Did you copy <br/> the complete URL?}
    G --> |Yes| D
    G --> |"No :("| H(Try using the Timeline tab in History <br/>from same browser you used to create the diagram.)
    click D href "https://github.com/mermaid-js/mermaid-live-editor/issues/new?assignees=&labels=bug&template=bug_report.md&title=Broken%20link" "Raise issue"`;

export const codeStore = persist(writable(defaultState), localStorage(), 'codeStore');
export const serializedState: Readable<string> = derived([codeStore], ([code], set) => {
	set(serializeState(code));
});

export const loadState = (data: string): void => {
	let state: State;
	console.log('Loading', data);
	try {
		state = deserializeState(data);
		console.log(state);
		const mermaidConfig: { [key: string]: string } =
			typeof state.mermaid === 'string' ? JSON.parse(state.mermaid) : state.mermaid;
		if (
			mermaidConfig.securityLevel &&
			mermaidConfig.securityLevel !== 'strict' &&
			confirm(
				`Removing "securityLevel":"${mermaidConfig.securityLevel}" from the config for safety.\nClick Cancel if you trust the source of this Diagram.`
			)
		) {
			delete mermaidConfig.securityLevel; // Prevent setting overriding securityLevel when loading state to mitigate possible XSS attack
		}

		state.mermaid = JSON.stringify(mermaidConfig, null, 2);
	} catch (e) {
		state = get(codeStore);
		if (data) {
			console.error('Init error', e);
			state.code = urlParseFailedState;
		}
	}
	updateCodeStore({ ...state, updateEditor: true });
};

export const updateCodeStore = (newState: State): void => {
	codeStore.update((state) => {
		return { ...state, ...newState };
	});
};

let prompted = false;
export const updateCode = (code: string, updateEditor: boolean, updateDiagram = false): void => {
	saveStatistics(code);
	const lines = (code.match(/\n/g) || '').length + 1;

	if (lines > 50 && !prompted && get(codeStore).autoSync) {
		const turnOff = confirm(
			'Long diagram detected. Turn off Auto Sync? Click the sync logo to manually sync.'
		);
		prompted = true;
		if (turnOff) {
			updateCodeStore({
				autoSync: false
			} as State);
		}
	}

	codeStore.update((state) => {
		return { ...state, code, updateEditor, updateDiagram };
	});
};

export const updateConfig = (config: string, updateEditor: boolean): void => {
	codeStore.update((state) => {
		return { ...state, mermaid: config, updateEditor };
	});
};

export const toggleDarkTheme = (dark: boolean): void => {
	codeStore.update((state) => {
		const config = JSON.parse(state.mermaid);
		if (!config.theme || ['dark', 'default'].includes(config.theme)) {
			config.theme = dark ? 'dark' : 'default';
		}

		return { ...state, mermaid: JSON.stringify(config, null, 2), updateEditor: true };
	});
};

export const initURLSubscription = (): void => {
	serializedState.subscribe((state: string) => {
		history.replaceState(undefined, undefined, `#${state}`);
	});
};

export const getStateString = (): string => {
	return JSON.stringify(get(codeStore));
};
