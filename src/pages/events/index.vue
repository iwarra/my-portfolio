<script setup>
import eventsData from '~/data/events.json';

const metaData = {
	title: 'Events | ivona.se',
	meta: [
		{
			hid: 'description',
			name: 'description',
			content: 'Tech events and meetups I have attended',
		},
	],
};
useHead(metaData);

const searchValue = ref('');
const filterValue = ref('');

const filteredEvents = computed(() => {
	return eventsData.filter((event) => {
		const matchesSearch = event.title
			.toLowerCase()
			.includes(searchValue.value.toLowerCase());
		const matchesFilter =
			filterValue.value === '' || event.eventType === filterValue.value;
		return matchesSearch && matchesFilter;
	});
});
</script>

<template>
	<Layout
		navBackgroundColor="gray"
		headerBackground="pink">
		<template #navLinks>
			<menu class="header-links">
				<li><NuxtLink to="/">Home</NuxtLink></li>
				<li><NuxtLink to="/blog">Blog</NuxtLink></li>
			</menu>
		</template>
		<template #hero>
			<div class="events-hero pink">
				<div class="hero-wrapper">
					<div class="hero-miniWrap">
						<h1 class="events-title">My Events</h1>
						<form>
							<div class="search-wrapper">
								<div
									role="search"
									class="search-group">
									<component
										class="search-icon"
										is="IconsSearch" />
									<input
										name="search"
										type="search"
										placeholder="Search events..."
										v-model="searchValue"
										@keypress.enter.prevent="" />
								</div>
								<div class="filter-group">
									<component
										class="filter-icon"
										is="IconsFilter" />
									<select
										name="eventType"
										v-model="filterValue">
										<option
											selected
											value="">
											All types
										</option>
										<option value="PHYSICAL">In person</option>
										<option value="ONLINE">Online</option>
									</select>
								</div>
							</div>
						</form>
					</div>
					<img
						src="/speaker.svg"
						alt=""
						class="hero-img" />
				</div>
			</div>
		</template>

		<main>
			<Separator styling="pink incline" />
			<div class="posts-wrapper">
				<ul class="posts-list">
					<template
						v-for="(event, index) in filteredEvents"
						:key="event.id">
						<li class="post-card">
							<div class="post-wrap">
								<h2 class="post-title">{{ event.title }}</h2>
								<p
									v-if="event.summary"
									class="post-summary">
									{{ event.summary }}
								</p>
								<ul
									v-if="event.speakers && event.speakers.length"
									class="speakers-list">
									<li
										v-for="speaker in event.speakers"
										:key="speaker.name"
										class="speaker-item">
										<span class="speaker-name">{{ speaker.name }}</span>
										<span
											v-if="speaker.title || speaker.company"
											class="speaker-meta">
											{{
												[speaker.title, speaker.company]
													.filter(Boolean)
													.join(', ')
											}}
										</span>
									</li>
								</ul>
								<div class="post-extraInfo">
									<span style="display: flex; align-items: center; gap: 0.3rem">
										<component
											is="IconsCalendarMonth"
											class="calendar-icon" />
										{{ dateFormatter(event.dateTime).year }}/{{
											dateFormatter(event.dateTime).month
										}}/{{ dateFormatter(event.dateTime).date }}
									</span>
									<span
										class="venue-label"
										style="display: flex; align-items: center; gap: 0.3rem">
										<component
											is="IconsLocationPin"
											v-if="event.eventType !== 'ONLINE'"
											class="venue-icon" />
										{{
											event.eventType === 'ONLINE' ? 'Online' : event.venue.name
										}}</span
									>
								</div>
							</div>
						</li>
						<Separator
							:class="index % 2 !== 0 ? 'incline pink' : 'decline gray'" />
					</template>
				</ul>
			</div>
		</main>
	</Layout>
</template>

<style scoped lang="scss">
@import '../../global.scss';

.venue-icon,
.calendar-icon {
	font-size: 1.4rem;
	color: var(--primary-accent);
}

.events-hero {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
}

.hero-wrapper {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	max-width: 1000px;
	padding-top: 4rem;
	padding-bottom: 2rem;
	z-index: 2;
}

.hero-miniWrap {
	display: flex;
	flex-direction: column;
}

.events-title {
	margin-block: 0;
}

.search-wrapper {
	margin-top: 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	input,
	select {
		padding-left: 4px;
		font-weight: 600;
		font-size: 1.1rem;
		border: none;
		background-color: #fff;
		color: var(--primary-accent);
	}

	input::placeholder {
		color: var(--primary-accent);
		opacity: 1;
	}

	input,
	select {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}

	select {
		width: 100%;
		cursor: pointer;
	}

	.filter-group::after {
		content: url('/arrow-down.svg');
		color: black;
		width: 0.8rem;
		height: 0.8rem;
		position: absolute;
		transform: translate(5%, 20%);
		right: 1rem;
		pointer-events: none;
	}

	button {
		@extend %btn;
		padding: 0.6rem 1rem;
		color: var(--primary-accent);
		background-color: #fff;
	}

	.search-group,
	.filter-group {
		display: flex;
		background-color: #fff;
		padding: 0.6rem 1rem;
		border-radius: 10px;
		position: relative;
	}

	.search-icon,
	.filter-icon {
		font-size: 24px;
		margin-right: 0.7rem;
	}
}

.hero-img {
	display: none;
}

.posts-wrapper {
	display: flex;
	flex-direction: column;
	gap: 5rem;
	padding-bottom: 3rem;
}

.posts-list {
	list-style: none;
	display: flex;
	flex-direction: column;
}

.posts-list > li + div {
	margin-bottom: 0;
}

li.post-card:nth-of-type(2n) {
	background-image:
		url(/grainy_texture.png),
		linear-gradient(var(--secondary-light), var(--secondary-light));
	padding-block: 3rem;
	padding: 4rem 0 3rem 0;
}

.post-wrap {
	display: flex;
	flex-direction: column;
	gap: 1.8rem;
	margin: 0 auto;
	max-width: 1000px;
	padding: 6rem 2rem 2rem 2rem;
	position: relative;
	z-index: 2;
}

.post-title {
	color: var(--font-primary);
	font-size: 2rem;
	font-weight: 600;
	margin-bottom: 0.8rem;
}

.post-summary {
	font-size: 1.2rem;
	line-height: 1.45;
	margin: 0;
}

.speakers-list {
	list-style: none;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 3rem;
}

.speaker-item {
	display: flex;
	flex-direction: column;
	gap: 0.1rem;
}

.speaker-name {
	font-weight: 900;
	font-size: 1.2rem;
	color: var(--primary-accent);
}

.speaker-meta {
	font-size: 0.82rem;
	color: var(--font-secondary);
}

.post-extraInfo {
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	font-size: 1rem;
	margin-top: 0.5rem;
}

@media (min-width: 800px) {
	.hero-img {
		display: unset;
		height: 280px;
	}
}
</style>
