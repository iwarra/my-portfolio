export default defineEventHandler(() => {
	return [
		{
			title: "System demo",
			description:
				"A fleet management dashboard demo built for a customer project.",
			image: "system.png",
			tools: ["Vue", "Vite", "TypeScript", "Mapbox"],
			links: {
				gitHub: "",
				liveDemo: "https://crew.ivona.se/",
			},
		},
		{
			title: "Vue Dashboard",
			description:
				"A B2B-dashboard designed and built using Vue 3 and good-old CSS. State managed with Pinia.",
			image: "dash.png",
			tools: ["Vue", "Vite", "Pinia"],
			links: {
				gitHub: "https://github.com/iwarra/vue-system",
				liveDemo: "https://dashboard.ivona.se/",
			},
		},
		{
			title: "Poditory",
			description:
				"A project built with vanilla JS, HTLM and CSS. The coding challenge was to fetch and display ten podcasts from Sveriges Radio API.",
			image: "poditory.png",
			tools: ["HTML", "JavaScript", "CSS"],
			links: {
				gitHub: "https://github.com/iwarra/podcast-project",
				liveDemo: "https://poditory.ivona.se/",
			},
		},
		{
			title: "Quiz App",
			description:
				"A quiz app built with Typescript and React. Using OpenTDB API. Styled with styled components.",
			image: "quiz.png",
			tools: ["React", "TypeScript", "Styled Components"],
			links: {
				gitHub: "https://github.com/iwarra/quiz-app",
				liveDemo: "https://quiz.ivona.se/",
			},
		},
		{
			title: "Exerciser",
			description: "Fullstack MERN app with all CRUD operations.",
			image: "exerciser.png",
			tools: ["React", "Node", "Express", "MongoDB"],
			links: {
				gitHub: "https://github.com/iwarra/excercise-app",
				liveDemo: "https://exercizer.ivona.se/",
			},
		},
		{
			title: "Habit Tracker",
			description:
				"Habit tracking website built with React. Under construction.",
			image: "ht.png",
			tools: ["React", "JavaScript", "SCSS"],
			links: {
				gitHub: "https://github.com/iwarra/habit-tracker",
				liveDemo: "",
			},
		}
	];
});
