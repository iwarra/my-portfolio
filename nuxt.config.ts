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
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: "/apple-touch-icon.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "32x32",
					href: "/favicon-32x32.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "16x16",
					href: "/favicon-16x16.png",
				},
				{
					rel: "manifest",
					href: "/site.webmanifest",
				},
				{
					rel: "mask-icon",
					href: "/safari-pinned-tab.svg",
					color: "#5bbad5",
				},
			],
			meta: [
				{ name: "author", content: "Ivona Josipovic" },
				{ name: "msapplication-TileColor", content: "#da532c" },
				{ name: "theme-color", content: "#ffffff" },
				{
					name: "viewport",
					content:
						"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
				},
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
		"@nuxt/image",
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
