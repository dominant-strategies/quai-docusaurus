// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Quai Documentation',
	tagline: 'Own your future',
	favicon: 'img/favicon.ico',

	// Set the production url of your site here
	url: 'https://your-docusaurus-test-site.com',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'dominant-strategies', // Usually your GitHub org/user name.
	projectName: 'quai-docs', // Usually your repo name.

	onBrokenLinks: 'throw',
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
			({
				docs: {
					path: 'docs',
					sidebarPath: require.resolve('./sidebars.js'),
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl:
						'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
					remarkPlugins: [math],
					rehypePlugins: [katex],
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
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
		({
			// Replace with your project's social card
			image: 'img/quai-social-card.jpg',
			navbar: {
				title: 'Quai Documentation',
				logo: {
					alt: 'Quai Network Logo',
					src: 'img/quai-logo.png',
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
						title: 'More',
						items: [
							{
								label: 'GitHub',
								href: 'https://github.com/dominant-strategies',
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} Dominant Strategies, Inc.`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
