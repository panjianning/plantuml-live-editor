<script context="module">
	import { version } from 'mermaid/package.json';
	import { analytics } from '$lib/util/stats';
	analytics?.track('version', {
		mermaidVersion: version
	});
</script>

<script lang="ts">
	import Theme from './theme.svelte';

	interface Link {
		title: string;
		href: string;
		icon?: string;
	}
	const links: Link[] = [
		{
			title: 'Documentation',
			href: 'https://plantuml.com/'
		},
		{
			title: 'PlantUML',
			href: 'https://github.com/plantuml/plantuml'
		},
		{
			title: '',
			href: 'https://github.com/panjianning/plantuml-live-editor',
			icon: 'fab fa-github fa-lg'
		}
	];
</script>

<div class="navbar mb-2 shadow-lg bg-primary">
	<div class="flex-1 px-2 mx-2">
		<span class="text-lg font-bold">
			<a href="/">PlantUML Live Editor</a>
		</span>
	</div>
	<label for="menu-toggle" class="pointer-cursor lg:hidden block"
		><svg
			class="fill-current "
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 20 20"
			><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg
		></label>
	<input class="hidden" type="checkbox" id="menu-toggle" />

	<Theme />
	<div class="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
		<ul class="lg:flex items-center justify-between text-base pt-4 lg:pt-0">
			{#each links as { title, href, icon }}
				<li>
					<a class="btn btn-ghost" target="_blank" {href}>
						{#if icon}
							<i class={icon} />
						{/if}
						{title}</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	#menu-toggle:checked + #menu {
		display: block;
	}
	.navbar {
		z-index: 10000;
	}
</style>
