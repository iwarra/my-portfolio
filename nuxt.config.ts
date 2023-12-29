// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	site: {
		url: "https://ivona.se",
		name: "Ivona Josipovic | Frontend developer",
	},
	sitemap: {
		sources: ["/api/_sitemap/urls"],
	},
	app: {
		head: {
			link: [
				{
					rel: "icon",
					href: "/icon.svg",
					type: "image/svg+xml",
				},
			],
			meta: [
				{ name: "author", content: "Ivona Josipovic" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ charset: "utf-8" },
			],
		},
		rootId: "portfolio",
	},
	pages: true,
	devtools: { enabled: false },
	srcDir: "src/",
	components: {
		global: true,
		dirs: ["~/components"],
	},
	modules: [
		"@nuxt/content",
		"vue3-carousel-nuxt",
		"nuxt-simple-sitemap",
		"@nuxtjs/robots",
		"@nuxtjs/i18n",
	],
	i18n: {
		locales: [
			{
				code: "en",
				name: "English",
				file: "en.js",
			},
			{
				code: "sv",
				name: "Svenska",
				file: "sv.js",
			},
		],
		langDir: "lang",
		defaultLocale: "en",
		strategy: "prefix_except_default",
		detectBrowserLanguage: false,
	},
	carousel: {
		prefix: "External",
	},
	content: {
		documentDriven: false,
		highlight: {
			theme: "min-dark",
			preload: ["vue", "json", "jsx", "sass", "scss"],
		},
	},
	vite: {
		css: {
			devSourcemap: true,
		},
		build: {
			sourcemap: true,
			rollupOptions: {
				external: [
					"illustration.svg",
					"arrow-left.svg",
					"arrow-right.svg",
					"quote-left.png",
					"quote-right.png",
				],
			},
		},
	},
	css: ["~/global.scss"],
});
