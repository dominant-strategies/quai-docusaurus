// @ts-check

import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
const { themes } = require('prism-react-renderer')
const lightTheme = themes.github
const darkTheme = themes.dracula
const math = require('remark-math')
const katex = require('rehype-katex')

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Quai Documentation',
	tagline: 'Own your future',
	favicon: 'img/favicon.ico',

	// Production site url
	url: 'https://qu.ai/',
	// base url under which site is served
	baseUrl: 'quai-docs',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'dominant-strategies', // Usually your GitHub org/user name.
	projectName: 'quai-docs', // Usually your repo name.
	deploymentBranch: 'gh-pages', // Branch responsible for deployment.
	trailingSlash: false,

	onBrokenLinks: 'ignore',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			{
				docs: {
					routeBasePath: '/',
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/dominant-strategies/quai-docs/tree/main/',
					showLastUpdateAuthor: true,
					showLastUpdateTime: true,
					remarkPlugins: [math],
					rehypePlugins: [katex],
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			} satisfies Preset.Options,
		],
	],

	stylesheets: [
		{
			href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
			type: 'text/css',
			integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
			crossorigin: 'anonymous',
		},
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		{
			image: 'img/quai-social-card.jpg',
			navbar: {
				title: 'Quai Documentation',
				logo: {
					alt: 'Quai Network Logo',
					src: 'img/quai-logo.png',
					href: '/docs/introduction',
				},
				items: [
					{
						type: 'docSidebar',
						sidebarId: 'learnSidebar',
						position: 'left',
						label: 'Learn',
					},
					{
						type: 'docSidebar',
						sidebarId: 'participateSidebar',
						position: 'left',
						label: 'Participate',
					},
					{
						type: 'docSidebar',
						sidebarId: 'developSidebar',
						position: 'left',
						label: 'Develop',
					},
					{
						href: 'https://github.com/dominant-strategies/quai-docs',
						label: 'GitHub',
						position: 'right',
					},
				],
			},
			footer: {
				style: 'dark',
				links: [
					{
						title: 'Docs',
						items: [
							{
								label: 'Learn',
								to: '/docs/learn/intro',
							},
							{
								label: 'Participate',
								to: '/docs/participate/intro',
							},
							{
								label: 'Develop',
								to: '/docs/develop/intro',
							},
						],
					},
					{
						title: 'Community',
						items: [
							{
								label: 'Website',
								href: 'https://qu.ai/',
							},
							{
								label: 'Discord',
								href: 'https://discord.gg/quai/',
							},
							{
								label: 'Twitter',
								href: 'https://twitter.com/QuaiNetwork/',
							},
							{
								label: 'Telegram',
								href: 'https://t.me/QuaiNetwork/',
							},
						],
					},
					{
						title: 'GitHub Repositories',
						items: [
							{
								label: 'Node Client',
								href: 'https://github.com/dominant-strategies/go-quai',
							},
							{
								label: 'GPU Miner',
								href: 'https://github.com/dominant-strategies/quai-gpu-miner',
							},
							{
								label: 'Pelagus Wallet',
								href: 'https://github.com/PelagusWallet/pelagus-extension',
							},
							{
								label: 'Quai Docs',
								href: 'https://github.com/dominant-strategies/quai-docs',
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} Dominant Strategies, Inc.`,
			},
			prism: {
				theme: lightTheme,
				darkTheme: darkTheme,
				additionalLanguages: ['solidity', 'bash', 'diff', 'json'],
			},
		} satisfies Preset.ThemeConfig,
}

module.exports = config
