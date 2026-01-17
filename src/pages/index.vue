<script setup>
useHead({
	script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
	title: 'Ivona Josipovic | Fullstack developer',
	meta: {
		hid: 'description',
		name: 'description',
		content:
			'Ivona Josipovic is a fullstack developer based in Stockholm. She enjoys building things using HTML, CSS, JavaScript, Vue and React.',
	},
});

import { aboutMe } from '../data/content.js';
const { data: latestPosts } = await useAsyncData('latest', () =>
	queryContent('/').limit(5).without('body').sort({ date: -1, $numeric: true }).find(),
);

const {
	data: {
		value: { projects, skills, softSkills, communities, testimonials },
	},
} = await useAsyncData('home', async () => {
	const [projects, skills, softSkills, communities, testimonials] = await Promise.all([
		$fetch('/api/projects'),
		$fetch('/api/skills/technical'),
		$fetch('/api/skills/soft'),
		$fetch('/api/communities'),
		$fetch('/api/testimonials'),
	]);

	return { projects, skills, softSkills, communities, testimonials };
});

const handleScroll = (direction, element) => {
	const { childElementCount: children, scrollWidth, scrollLeft } = element;
	let distance = scrollWidth / children + 3;
	let length;

	if (direction === 'left') {
		length = scrollLeft - distance;
		element.scroll(length, 0);
	}

	if (direction === 'right') {
		length = scrollLeft + distance;
		element.scroll(length, 0);
	}
};
</script>

<template>
	<Layout
		navBackgroundColor="gray"
		headerBackground="pink">
		<template #navLinks>
			<menu class="header-links">
				<li><a href="#projects">Projects</a></li>
				<li><a href="#testimonials">Testimonials</a></li>
				<li><NuxtLink to="/blog">Blog</NuxtLink></li>
			</menu>
		</template>
		<template #hero>
			<div class="hero-wrapper pink">
				<section class="header-hero">
					<div class="hero-text">
						<h1 class="hero-title">{{ $t('home_pageTitle') }}</h1>
						<p class="hero-subtitle">{{ $t('home_pageSubtitle') }}</p>
						<div class="hero-buttons">
							<a
								href="/ivona_josipovic_cv.pdf"
								target="_blank"
								class="hero-primaryBtn"
								>{{ $t('home_ctaBtn1') }}</a
							>
							<a
								href="#contact"
								class="hero-secondaryBtn"
								>{{ $t('home_ctaBtn2') }}</a
							>
						</div>
					</div>
					<img
						class="hero-img"
						src="/illustration.svg"
						alt="illustration of girl sitting at a table with her laptop" />
				</section>
			</div>
		</template>

		<main>
			<Separator styling="incline" />
			<section id="projects">
				<h2 class="projects-title">{{ $t('home_projects_title') }}</h2>
				<Carousel
					class="projects-wrapper"
					selector="slider"
					@arrowClicked="(direction, element) => handleScroll(direction, element)">
					<li
						class="project-card"
						v-for="project in projects"
						:key="project.title">
						<img
							class="project-img"
							:src="project.image"
							:alt="`screenshot of the ${project.title} user interface`" />
						<div class="project-text">
							<h3 class="project-title">{{ project.title }}</h3>
							<span class="project-tools">
								Tools used:
								{{ listFormatter.format(project.tools) }}
							</span>
							<p class="project-description">{{ project.description }}</p>
							<ul class="project-links">
								<li>
									<a :href="project.links.gitHub">GitHub</a>
								</li>
								<span>|</span>
								<li v-if="project.links.liveDemo !== ''">
									<a
										:href="project.links.liveDemo"
										target="_blank"
										>Live Demo</a
									>
								</li>
								<span v-else>In progress</span>
							</ul>
						</div>
					</li>
				</Carousel>
			</section>
			<Separator styling="decline" />
			<section id="about">
				<h2 class="about-title">{{ $t('home_about_title') }}</h2>
				<div class="about-wrapper">
					<div class="about-skills">
						<h3>{{ $t('home_about_skillsTitle') }}</h3>
						<ul class="skills-list">
							<Box
								v-for="skill in skills"
								:key="skill.name"
								:name="skill.name"
								:icon="skill.icon"
								:iconType="skill.iconType" />
						</ul>
					</div>
					<div class="about-text">
						<h3>{{ $t('home_about_aboutMeTitle') }}</h3>
						<p style="text-align: justify">{{ aboutMe }}</p>
					</div>
					<div class="about-skills">
						<h3>{{ $t('home_about_softSkillsTitle') }}</h3>
						<ul class="skills-list">
							<Box
								v-for="skill in softSkills"
								:key="skill.name"
								:name="skill.name"
								:icon="skill.icon"
								iconType="img" />
						</ul>
					</div>
				</div>
			</section>
			<Separator styling="incline" />
			<section id="communities">
				<h2 class="communities-title">{{ $t('home_communities_title') }}</h2>
				<div class="communities-wrapper">
					<ul class="communities-list">
						<li
							v-for="com in communities"
							:key="com.org">
							<img
								:src="com.logo"
								:alt="`logo of ${com.org}`"
								class="communities-logo" />
						</li>
					</ul>
				</div>
			</section>
			<Separator styling="decline" />
			<section id="testimonials">
				<h2 class="testimonials-title">{{ $t('home_testimonials_title') }}</h2>
				<Carousel
					class="testimonials-wrapper"
					selector="slider"
					@arrowClicked="(direction, element) => handleScroll(direction, element)">
					<li
						v-for="testimonial in testimonials"
						class="testimonial-card"
						:key="testimonial.from">
						<div class="testimonial-wrap">
							<img
								class="testimonial-quoteLeft"
								src="/quote-left.png"
								alt="opening quotation mark" />
							<em
								><p class="testimonial-text" v-html="testimonial.recommendation">
								</p></em
							>
							<span class="testimonial-signature">
								- {{ testimonial.from }}, {{ testimonial.workTitle }}</span
							>
							<img
								class="testimonial-quoteRight"
								src="/quote-right.png"
								alt="closing quotation mark" />
						</div>
					</li>
				</Carousel>
			</section>
			<Separator styling="incline" />
			<section id="blog">
				<h2>{{ $t('home_blog_title') }}</h2>
				<div class="blog-wrapper">
					<ul class="blog-list">
						<li
							v-for="post in latestPosts"
							class="blog-item">
							<NuxtLink
								:to="'blog' + post._path"
								class="blog-link">
								{{ post.title }}
								<time class="post-date">
									{{ dateFormatter(post.date).year }}/{{ dateFormatter(post.date).month }}/{{
										dateFormatter(post.date).date
									}}
								</time>
							</NuxtLink>
						</li>
					</ul>
				</div>
			</section>
			<Separator styling="decline" />
			<section id="contact">
				<h2 class="contact-title">{{ $t('home_connect_title') }}</h2>
				<ul class="contact-list">
					<li>
						<a
							href="https://www.linkedin.com/in/ivona-josipovic/"
							target="_blank">
							<component
								is="IconsLinkedin"
								class="contact-icon" />
						</a>
					</li>
					<li>
						<a
							href="mailto:josipovic.ivona@gmail.com"
							target="_blank">
							<component
								is="IconsMail"
								class="contact-icon" />
						</a>
					</li>
					<li>
						<a
							href="https://github.com/iwarra"
							target="_blank">
							<component
								is="IconsGithub"
								class="contact-icon" />
						</a>
					</li>
				</ul>
			</section>
		</main>
	</Layout>
</template>

<style scoped lang="scss">
@import '../global.scss';
.hero-wrapper {
	display: flex;
	min-height: 40vh;
	justify-content: center;
	align-items: center;
	padding-top: 3rem;
	width: 100%;
}
.header-hero {
	display: flex;
	justify-content: center;
	margin-inline: 3rem;
	position: relative;
	z-index: 2;
}
.hero-title {
	overflow: hidden;
	white-space: nowrap;
	border-right: 2px solid transparent;
	font-size: 2rem;
	width: 0;
	max-width: 350px;
	animation: typing 2s steps(30, end) forwards, blinking 2.5s 1;
}

@keyframes typing {
	from {
		width: 0;
	}
	to {
		width: 100%;
	}
}

@keyframes blinking {
	0% {
		border-color: transparent;
	}
	50% {
		border-color: black;
	}
	100% {
		border-color: transparent;
	}
}

.hero-subtitle {
	font-size: 1.6rem;
	margin-bottom: 1.6rem;
	font-weight: 500;
}

.hero-text {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.hero-buttons {
	display: inline-block;

	.hero-primaryBtn {
		@extend %btn !optional;
		align-self: start;
		background-color: var(--primary-accent);
		color: var(--secondary-light);
		margin-right: 1rem;
	}

	.hero-secondaryBtn {
		@extend %btn !optional;
		background-color: var(--secondary-light);
		color: var(--primary-accent);
	}

	a {
		text-decoration: none;
	}

	a:hover {
		filter: none;
	}
}

.hero-img {
	display: none;
}

@media (min-width: 850px) {
	.hero-wrapper {
		margin: 0 auto;
		padding-top: 6rem;
		padding-bottom: 2rem;
	}

	.header-hero {
		max-width: 1000px;
		flex-direction: row;
		justify-content: space-evenly;
		gap: 2rem;
	}

	.hero-img {
		display: flex;
		width: 300px;
		height: 300px;
	}

	.hero-title {
		font-size: 2.8rem;
		max-width: 500px;
	}

	.hero-subtitle {
		font-size: 2rem;
	}
}

@media (min-width: 1200px) {
	.header-hero {
		margin-inline: 0;
	}
}

#projects {
	display: flex;
	flex-direction: column;
	align-items: center;

	.projects-wrapper {
		display: flex;
		margin-bottom: 1rem;
		z-index: 2;
		width: 100%;
		max-width: 1200px;
	}

	.project-wrap {
		margin-inline: 0.8rem;
		background-color: var(--primary-light);
		border-radius: var(--borderRadius-large);
		display: flex;
		flex-direction: column;
	}
	.project-card {
		display: flex;
		flex-direction: column;
		flex: none;
		width: calc(100% - 0.5rem);
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}

	.project-text {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
		line-height: 1.2;
		flex: 1;
		background-color: rgba(229, 229, 229, 0.6901960784);
		border-radius: 0 0 var(--borderRadius-large) var(--borderRadius-large);
	}

	.project-img {
		width: 100%;
		aspect-ratio: 2/1.2;
		object-fit: cover;
		object-position: top center;
		border: 2px solid #e5e5e5;
		border-radius: var(--borderRadius-large) var(--borderRadius-large) 0 0;
	}

	.project-title {
		font-weight: 500;
		margin-bottom: 0;
	}

	.project-description {
		flex: 1;
	}

	.project-links {
		list-style: none;
		display: flex;
		gap: 0.8rem;

		a,
		a:visited {
			color: var(--primary-accent);
			color: var(--font-primary);
		}

		span {
			color: var(--font-secondary);
		}
	}

	.project-tools {
		list-style: none;
		font-weight: 500;
		color: var(--secondary-accent);

		li {
			display: inline;
			font-size: 1rem;
		}
	}

	@media (min-width: 580px) {
		.project-card {
			width: calc(50% - 0.5rem);
		}
	}
	@media (min-width: 1000px) {
		.project-card {
			width: calc(33.33% - 0.5rem);
		}

		.project-text {
			padding: 2rem;
		}
	}
}

#about {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: center;
	align-items: center;

	.about-wrapper {
		max-width: 1000px;
		display: flex;
		flex-direction: column;
		gap: 4rem;
		margin: 0 3rem 3rem 3rem;
		z-index: 2;
	}

	.about-text p {
		font-size: 1.15rem;
	}

	.skills-list {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	@media (min-width: 850px) {
		.about-text {
			order: 1;
		}
		.about-skills {
			order: 2;
		}
	}
}

#communities {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: end;
	align-items: center;

	.communities-wrapper {
		max-width: 1000px;
		z-index: 2;
		margin-inline: 3rem;
	}

	.communities-list {
		list-style: none;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 3rem;

		img {
			max-height: 80px;
		}
	}
}

#testimonials {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
	position: relative;

	.carousel-wrapper {
		display: flex;
	}

	.testimonial-card {
		display: flex;
		flex-direction: column;
		flex: none;
		width: calc(100% - 0.5rem);
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}

	.testimonial-wrap {
		margin: 0 5px;
		border-radius: var(--borderRadius-large);
		border: 1px solid var(--primary-accent);
		flex: 1;
		position: relative;
		padding: 4rem 2.5rem;
		background-image: url(/grainy_texture.png),
			linear-gradient(var(--primary-light), var(--primary-light));
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.testimonial-text {
		max-height: 300px;
		overflow: auto;
		margin-bottom: 3rem;
		font-size: 1.1rem;
		font-weight: 300;
		line-height: 1.5rem;
		text-align: start;
		scrollbar-color: var(--primary-accent) transparent;
		scrollbar-width: thin;
		padding-right: 1rem;
	}

	.testimonials-wrapper {
		display: flex;
		overflow: hidden;
		margin-bottom: 2rem;
		z-index: 2;
		width: 100%;
		max-width: 1200px;
	}

	// scrollbar style for older browsers
	::-webkit-scrollbar {
		background: transparent;
		height: 8px;
		width: 6px;
	}
	::-webkit-scrollbar-track {
		background: transparent;
	}
	::-webkit-scrollbar-thumb {
		background: var(--primary-accent);
		border-radius: 6px;
	}

	.testimonial-quoteLeft {
		position: absolute;
		height: 40px;
		top: 0.8rem;
		left: 1rem;
	}

	.testimonial-quoteRight {
		position: absolute;
		height: 40px;
		bottom: 0.8rem;
		right: 1rem;
	}

	.testimonial-signature {
		font-weight: 600;
		text-align: start;
	}

	@media (min-width: 850px) {
		.testimonial-card {
			width: calc(50% - 0.5rem);
		}

		.testimonial-wrap {
			padding: 4rem 1.5rem;
		}
	}

	@media (min-width: 1000px) {
		.testimonial-wrap {
			padding: 4rem 2.5rem;
		}
	}
}

#blog {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;

	.blog-wrapper {
		max-width: 1000px;
	}

	.blog-list {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		list-style: none;
		margin-inline: 3rem;

		li:nth-last-child(1) {
			border-bottom: none;

			a {
				padding-bottom: 0;
			}
		}
	}

	.blog-item {
		border-bottom: dotted 1px var(--font-primary);
	}

	.blog-link {
		text-decoration: none;
		padding-bottom: 5px;
		font-size: 1.4rem;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		align-items: center;
		text-align: center;
		color: var(--font-primary);
		padding-bottom: 0.8rem;
	}

	.post-date {
		display: none;
	}

	@media (min-width: 850px) {
		.post-date {
			display: inline;
		}

		.blog-link {
			flex-direction: row;
			justify-content: space-between;
		}
		.blog-wrapper {
			width: 100%;
		}
	}
}

#contact {
	.contact-title {
		text-align: center;
		margin-bottom: 1.5rem;
	}
	.contact-list {
		display: flex;
		flex-direction: row;
		justify-content: center;
		list-style: none;
		gap: 2.5rem;
		padding-bottom: 4rem;
	}

	.contact-icon {
		font-size: 4rem;
		color: var(--primary-accent);
	}

	.contact-info {
		font-size: 1.2rem;
		color: var(--primary-accent);
	}
}
</style>
